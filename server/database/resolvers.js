const { PubSub, withFilter } = require('apollo-server-express');
const { resetCaches } = require('graphql-tag');
const Mongoose = require('mongoose');
const apiSchema = require('./apiSchema');
const Campaign = require('./models/campaign');
const Character = require('./models/character');
const Session = require('./models/session');
const User = require('./models/user');

const pubsub = new PubSub()//only works for a single server instance, so would need an alternative for cloud deployment

const resolvers = {
    Query: {
        users(root, args, context){
            //if(!context.user || !context.user.permissions>=2)
            return User.find().populate('campaigns');
        },
        user(root, args, context){
            //if (!context.user) {return null};
            //return User.findOne({username: args.username, password: args.password}).populate('characters').populate('campaigns');
            return User.findById(args.id).populate('characters').populate('campaigns');
        },
        async getUserID(root, args, context){
            const user = await User.findOne({username: args.username, password: args.password})
            return user._id
        },
        /* userByID(root, args, context){//maybe we dont want this? or maybe can limit returns?
            //if (!context.user) {return null};
            return User.findOne({_id:Mongoose.Types.ObjectId(args.id)});
        }, */
        campaigns(root, args, context){
            return Campaign.find().populate('characters');
        },
        campaign(root, args, context){
            return Campaign.findOne({_id:Mongoose.Types.ObjectId(args.id)}).populate('characters');
        },
        characters(root, args, context){
            return Character.find();
        },
        character(root, args, context){
            return Character.findOne({_id:Mongoose.Types.ObjectId(args.id)});
        },
        session(root, args, context){
            return Session.findById(args.id).populate('characters.character')
        },
        //---------------5eAPI queries, async because api returns promise
        async classes(root,args,{dataSources}){
            return await dataSources.characterAPI.getClasses()
        },
        async class(root,args,{dataSources}){
            return await dataSources.characterAPI.getClass(args.index)
        },
        async races(root, args, {dataSources}){
            return await dataSources.characterAPI.getRaces()
        },
        async race(root,args,{dataSources}){
            return await dataSources.characterAPI.getRace(args.index)
        },
        async equipmentCategories(root, args, {dataSources}){
            return await dataSources.itemsAPI.getCategories();
        },
        async equipment(root, args, {dataSources}){
            return await dataSources.itemsAPI.getEquipment(args.id)
        },
        async abilityScores(root, args, {dataSources}){
            return await dataSources.characterAPI.getAbilityScores()
        },
    },

    Mutation: {
        addUser(root, args, context){//works, but multiple times
            return User.create({
                _id: Mongoose.Types.ObjectId(),
                name: args.name,
                email: args.email,
                username: args.username,
                password: args.password,
                permissions: 1
            });
        },
        /* async clearUsers(root, args, context){ LEAVE THIS COMMENTED OUT IT IS ONLY FOR DEVELOPMENT
            await User.deleteMany({permissions:1})
            return "deleted users"
        }, */
        async addCampaign(root, args, context){
            const newID = Mongoose.Types.ObjectId()
            await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.dm)}, {$addToSet:{campaigns:newID}})
            return await Campaign.create({
                _id: newID,
                name: args.name,
                dm: Mongoose.Types.ObjectId(args.dm),
            })
        },
        async deleteCampaign(root, args, context){
            if(args.user === args.dm){//all args here are IDs
                await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.dm)}, {$pull:{campaigns:args.campaign}})
                await Campaign.findByIdAndDelete(args.campaign)
            }
            return "ran campaign deletion"
        },
        renameCampaign(root, args, context){
            return Campaign.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {name:args.name}, {new:true});//, {upsert:true}
        },
        async addCharacter(root, args, context){
            const newID = Mongoose.Types.ObjectId()
            await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.user)}, {$addToSet:{characters:newID}})
            await Campaign.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.campaign)}, {$addToSet:{characters:newID}})
            return await Character.create({
                _id: newID,
                user: Mongoose.Types.ObjectId(args.user),
                campaign: Mongoose.Types.ObjectId(args.campaign),
                name: args.name,
                race: args.race,
                background: args.background,
                class: "",
                level: 0,
                cha: 10,
                con: 10,
                dex: 10,
                int: 10,
                str: 10,
                wis: 10,
            })
        },
        async updateCharacterInfo(root, args, context){
            return await Character.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {$set:{name:args.name, campaign:args.campaign}}, {new:true})
        },
        async updateCharacterStats(root, args, context){
            return await Character.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {$set:{class:args.class, cha:args.cha, con:args.con, dex:args.dex, int:args.int, str:args.str, wis:args.wis}}, {new:true})
        },
        async deleteCharacter(root, args, context){
            await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.user)}, {$pull:{characters:args.character}})
            await Campaign.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.campaign)}, {$pull:{characters:args.character}})
            await Character.findByIdAndDelete(args.character)
            return "ran character deletion"
        },
        async createSession(root, args, context){
            const newID = Mongoose.Types.ObjectId()
            const campaign = await Campaign.findById(args.campaign)
            await Campaign.findByIdAndUpdate(Mongoose.Types.ObjectId(args.campaign), {$addToSet: {campaignHistory:campaign.currentSession}})
            await Campaign.findByIdAndUpdate(Mongoose.Types.ObjectId(args.campaign), {$set: {currentSession:newID}})
            const characters = []
            for await (const character of campaign.characters){
                characters.push({
                    _id: Mongoose.Types.ObjectId(character._id),
                    character: Mongoose.Types.ObjectId(character._id),
                    position: 0,
                })
            }
            return await Session.create({
                _id: newID,
                campaign: Mongoose.Types.ObjectId(args.campaign),
                characters: characters
            })
        },
        //play screen
        async changeCharacterPos(root, args, context){
            const payload = await Session.findOneAndUpdate({_id: Mongoose.Types.ObjectId(args.session), 'characters._id': Mongoose.Types.ObjectId(args.character)}, {$set: {'characters.$.position': args.position}}, {new:true}).populate('characters.character')//positional operator "$" makes sure the mutation happens to the corrent object in the array
            await pubsub.publish('SESSION_UPDATED', payload)
            return "done"
        },
        async changeCharacterHealth(root, args, context){
            await Character.findOneAndUpdate({_id: Mongoose.Types.ObjectId(args.character)}, {$set: {hp: args.hp}}, {new:true})//positional operator "$" makes sure the mutation happens to the corrent object in the array
            const payload = await Session.findOne({_id: Mongoose.Types.ObjectId(args.session)}).populate('characters.character')
            await pubsub.publish('SESSION_UPDATED', payload)
            return "done"
        }
    },

    Subscription: {
        sessionUpdate: {
            subscribe: withFilter(() => pubsub.asyncIterator('SESSION_UPDATED'),
                (payload, args)=>{
                    return (String(payload._id)===args.id)//pushes subscription to client if their sessionID is the same as the updated one
                }
            ),
            resolve: (payload) => { return payload },
        },
    }
};

module.exports = resolvers;