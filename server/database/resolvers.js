const Mongoose = require('mongoose');
const User = require('./models/user')

const resolvers = {
    Query: {
        users(){
            return User.find();//this works
        },
        user(root, args, context){
            return User.find(args);
        }
    },

    Mutation: {//ValidationError: users validation failed: username: Cast to string failed for value "{ name: 'nathans', username: 'user1', password: 
                //'user2' }" at path "username", password: Cast to string failed for value "{ _extensionStack: GraphQLExtensionStack { extensions: [] } }" at path "password"
        addUser(name, username, password){
            const user = User.create({
                _id: Mongoose.Types.ObjectId,
                name: name,
                username: username,
                password: password,
                permissions: 1
            }).then (()=> {
                return user;
            })
        },
    }
};

module.exports = resolvers;