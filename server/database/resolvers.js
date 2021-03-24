const Mongoose = require('mongoose');
const Campaign = require('./models/campaign');
const Character = require('./models/character');
const User = require('./models/user');

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
            return User.findOne({_id: args.token});
        },
        campaigns(root, args, context){
            return Campaign.find().populate('characters');
        },
        characters(root, args, context){
            return Character.find();
        },
        async equipmentCategories(root, args, {dataSources}){//async because datasource not context
            return await dataSources.itemsAPI.getCategories();
        },
        async equipment(root, args, {dataSources}){
            console.log(await dataSources.itemsAPI.getItem(args.id))
            return await dataSources.itemsAPI.getItem(args.id)
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
        addCampaign(root, args, context){
            Campaign.create({
                _id: Mongoose.Types.ObjectId(),
                name: args.name,
                dm: Mongoose.Types.ObjectId(args.dm),
            });
        },
        addCharacter(root, args, context){
            Character.create({
                _id: Mongoose.Types.ObjectId(),
                user: Mongoose.Types.ObjectId(args.user),
                campaign: Mongoose.Types.ObjectId(args.campaign),
                name: args.name,
            }), ()=>{};//need to then add to the user, too. 
        }
    }
};

module.exports = resolvers;