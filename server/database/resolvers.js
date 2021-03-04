const Mongoose = require('mongoose');
const User = require('./models/user');

const resolvers = {
    Query: {
        users(root, args, context){
            if(!context.user || !context.user.permissions>=2)
            return User.find();//this works
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
        addUser(root, args, context){//works!
            User.create({
                _id: Mongoose.Types.ObjectId(),
                name: args.name,
                username: args.username,
                password: args.password,
                permissions: 1
            });
        },
    }
};

module.exports = resolvers;