const Mongoose = require('mongoose');
const { where } = require('./models/user');
const User = require('./models/user')

const resolvers = {
    Query: {
        users(){
            return User.find();//this works
        },
        user(args){
            return User.find(args);
        }
    },
    User: {//no work for searching specific names
        name(user){
            return User.findOne(User.name == user.name);
        }
    },
    Mutation: {//this doesnt work
        addUser(root, args, context){
            User.create({
                this: User._id = Mongoose.Types.ObjectId,
                this: User.name = args.name,
                this: User.username = args.username,
                this: User.password = args.password,
                this: User.permissions = 1
            }).then (()=> {
                Mongoose.connection.collection('users').insertOne(this.User);
            }).then (()=> {
                return this.User;
            })
        }
    }
};

module.exports = resolvers;