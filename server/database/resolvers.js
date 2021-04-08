const { PubSub } = require('graphql-subscriptions');
const Mongoose = require('mongoose');
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
            return User.findOne({username: args.username, password: args.password}).populate('campaigns');
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
        async equipmentCategories(root, args, {dataSources}){
            return await dataSources.itemsAPI.getCategories();
        },
        async equipment(root, args, {dataSources}){
            return await dataSources.itemsAPI.getEquipment(args.id)
        }
    },

    Mutation: {
        addUser(root, args, context){//works, but multiple times
            User.create({
                _id: Mongoose.Types.ObjectId(),
                name: args.name,
                email: args.email,
                username: args.username,
                password: args.password,
                permissions: 1
            });
        },
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
            return await Character.create({
                _id: newID,
                user: Mongoose.Types.ObjectId(args.user),
                campaign: Mongoose.Types.ObjectId(args.campaign),
                name: args.name,
            })
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