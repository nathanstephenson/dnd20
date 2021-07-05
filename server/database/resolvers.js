const { PubSub, withFilter } = require('apollo-server-express');
const Mongoose = require('mongoose');
const Campaign = require('./models/campaign');
const Character = require('./models/character');
const Session = require('./models/session');
const User = require('./models/user');

const pubsub = new PubSub()//only works for a single server instance, so would need an alternative for cloud deployment

const resolvers = {
    Query: {
        users(root, args, context){
            return User.find().populate('campaigns');
        },
        user(root, args, context){
            return User.findById(args.id).populate('characters').populate('campaigns');
        },
        async getUserID(root, args, context){
            const user = await User.findOne({username: args.username, password: args.password})
            if(user!==null){return user._id}else{return undefined}
        },
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
        async getCurrentSessionID(root, args, context){
            const campaign = await Campaign.findOne({_id:Mongoose.Types.ObjectId(args.campaign)});
            return campaign.currentSession;
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
        addUser(root, args, context){
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
        async joinCampaign(root, args, context){
            //need to wipe character from other campaigns and sessions before this
            await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.user)}, {$addToSet:{campaigns:Mongoose.Types.ObjectId(args.id)}})
            await Campaign.findById(args.id)
            return await Campaign.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {$addToSet:{players:Mongoose.Types.ObjectId(args.user)}}, {new:true})
        },
        async leaveCampaign(root, args, context){//needs work, doesnt remove user from campaign
            const user = await User.findByIdAndUpdate(Mongoose.Types.ObjectId(args.user), {$pull:{campaigns:Mongoose.Types.ObjectId(args.campaign)}}).populate('characters')
            Campaign.findByIdAndUpdate(args.campaign, {$pull:{players:Mongoose.Types.ObjectId(args.user)}})
            await user.characters.forEach(element => {
                console.log(typeof element._id, typeof Mongoose.Types.ObjectId(args.campaign))
                if (String(element.campaign) === String(args.campaign)){
                    Character.findByIdAndUpdate(element._id, {$pull:{campaigns:Mongoose.Types.ObjectId(args.campaign)}})
                    Campaign.findByIdAndUpdate(args.campaign, {$pull:{characters:Mongoose.Types.ObjectId(String(element._id))}})
                }
            })
            return "done"
        },
        async deleteCampaign(root, args, context){
            const campaign = await Campaign.findById(args.campaign)
            if(args.user === args.dm){//all args here are IDs
                await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.dm)}, {$pull:{campaigns:Mongoose.Types.ObjectId(args.campaign)}})
                await campaign.players.forEach(element => {
                    User.findByIdAndUpdate(element, {$pull:{campaigns:Mongoose.Types.ObjectId(args.campaign)}})
                })
                await campaign.characters.forEach(element => {
                    Character.findByIdAndUpdate(element, {$set:{campaign:null}})
                })
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
            const campaign = await Campaign.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.campaign)}, {$addToSet:{characters:newID}})
            await Session.findByIdAndUpdate(campaign.currentSession, {$addToSet:{characters:{
                _id: newID,
                character: newID,
                position: 0,
            }}})
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
            const char = await Character.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {$set:{name:args.name, campaign:args.campaign}})
            if(Mongoose.Types.ObjectId(args.campaign) != char.campaign){
                await Campaign.findByIdAndUpdate(char.campaign, {$pull:{characters:Mongoose.Types.ObjectId(args.id)}})
                await Campaign.findByIdAndUpdate(args.campaign, {$addToSet:{characters:Mongoose.Types.ObjectId(args.id)}})
            }
            return await Character.findById(args.id)
        },
        async updateCharacterStats(root, args, context){
            return await Character.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {$set:{class:args.class, cha:args.cha, con:args.con, dex:args.dex, int:args.int, str:args.str, wis:args.wis}}, {new:true})
        },
        async deleteCharacter(root, args, context){
            await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.user)}, {$pull:{characters:args.character}})
            const campaign = await Campaign.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.campaign)}, {$pull:{characters:args.character}})
            await Session.findOneAndUpdate({_id: campaign.currentSession}, {$pull: {characters:{_id: args.character}}})
            await Character.findByIdAndDelete(args.character)
            return "ran character deletion"
        },
        async createSession(root, args, context){//sometimes doesnt transfer all characters?
            const newID = Mongoose.Types.ObjectId()
            const campaign = await Campaign.findById(args.campaign)
            if(String(args.user) === String(campaign.dm)){
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
            }
        },
        async endSession(root, args, context){
            const campaign = await Campaign.findById(args.campaign)
            if(String(args.user) === String(campaign.dm)){
                await Campaign.findByIdAndUpdate(args.campaign, {$addToSet:{sessionHistory:campaign.currentSession}, $set:{currentSession:null}})
            }
            return "done"
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