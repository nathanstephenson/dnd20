const Mongoose = require('mongoose');
const Campagin = require('./models/campaign');
const Character = require('./models/character');
const User = require('./models/user');

const resolvers = {
    Query: {
        users(root, args, context){
            //if(!context.user || !context.user.permissions>=2)
            return User.find();
        },
        user(root, args, context){
            //if (!context.user) {return null};
            return User.findOne({username: args.username, password: args.password});
        },
        userByID(root, args, context){
            //if (!context.user) {return null};
            return User.findOne({_id: args.token});
        },
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
            Campagin.create({
                _id: Mongoose.Types.ObjectId(),
                name: args.name,
                dm: {type: args.dm.id, ref:'users'},
            });
        },
        addCharacter(root, args, context){
            Character.create({
                _id: Mongoose.Types.ObjectId(),
                user: {type: args.user.id, ref:'users'},
                campaign: {type: args.campaign.id, ref:'campaigns'},
                name: args.name,
            });
        }
    }
};

module.exports = resolvers;