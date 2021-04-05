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
            return User.findOne({id:args.id});
        },
        campaigns(root, args, context){
            return Campaign.find().populate('characters');
        },
        campaign(root, args, context){
            return Campaign.findOne({id:args.id}).populate('characters');
        },
        characters(root, args, context){
            return Character.find();
        },
        character(root, args, context){
            return Character.findOne({id:args.id});
        },
        async equipmentCategories(root, args, {dataSources}){//async because api returns promise
            return await dataSources.itemsAPI.getCategories();
        },
        async equipment(root, args, {dataSources}){
            console.log(await dataSources.itemsAPI.getEquipment(args.id))
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
        addCampaign(root, args, context){
            Campaign.create({
                _id: Mongoose.Types.ObjectId(),
                name: args.name,
                dm: Mongoose.Types.ObjectId(args.dm._id),
            });
        },
        renameCampaign(root, args, context){
            Campaign.updateOne({_id:args.id}, {name:args.name});
        },
        addCharacter(root, args, context){
            const newid = Mongoose.Types.ObjectId()
            Character.create({
                _id: newid,
                user: Mongoose.Types.ObjectId(args.user._id),
                campaign: Mongoose.Types.ObjectId(args.campaign._id),
                name: args.name,
            }), ()=>{
                //then add the newid to the user's characters
            };
        },
    }
};

module.exports = resolvers;