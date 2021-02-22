const Mongoose = require('mongoose');
const User = require('./models/user');

const resolvers = {
    Query: {
        users(){
            return User.find();//this works
        },
        user(root, args, context){
            return User.findOne({username: args.username, password: args.password});
        }
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