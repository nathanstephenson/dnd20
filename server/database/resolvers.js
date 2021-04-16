const { PubSub } = require('graphql-subscriptions');
const { resetCaches } = require('graphql-tag');
const Mongoose = require('mongoose');
const apiSchema = require('./apiSchema');
const Campaign = require('./models/campaign');
const Character = require('./models/character');
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
            return User.findOne({username: args.username, password: args.password}).populate('characters').populate('campaigns');
        },
        userByID(root, args, context){//maybe we dont want this? or maybe can limit returns?
            //if (!context.user) {return null};
            return User.findOne({_id:Mongoose.Types.ObjectId(args.id)});
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
            //pubsub.publish('CAMPAIGN_UPDATED', {renameCampaign: {name:args.name}})
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
                cha: 0,
                con: 0,
                dex: 0,
                int: 0,
                str: 0,
                wis: 0,
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
    },

    /* Subsciption: {
        campaignUpdate: {
            subscribe: () => pubsub.asyncIterator(['CAMPAIGN_UPDATED'])
        },
        userUpdate: {
            subscribe: () => pubsub.asyncIterator(['USER_UPDATED'])
        }
    } */
};

module.exports = resolvers;