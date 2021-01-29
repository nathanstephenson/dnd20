const User = require('./models/user')

const resolvers = {
    Query: {
        user(_id){
            return User.find({where: _id});
        }
    },
    User: {
        name(user){
            return user.name;
        }
    }
};

module.exports = resolvers;