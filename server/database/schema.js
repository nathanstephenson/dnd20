const { gql, makeExecutableSchema } = require('apollo-server-express');
const resolvers = require('./resolvers')

const typeDefs = gql`
    
    type Character {
        _id: ID!
        name: String
        campaign: String
    }

    type Map {
        _id: ID!
        creator: User!
        campaign: Campaign
        name: String
        entities: [Character]
        width: Int
        height: Int
        startCell: Int
    }

    type Campaign {
        _id: ID!
        name: String
        DM: User!
        Characters: [Character]
        Maps: [Map]
        currentMap: Map
    }

    type User {
        _id: ID!
        username: String!
        password: String!
        permissions: Int!
        campgains: [Campaign]
        characters: [Character]
        maps: [Map]
    }

    type Query {
        users: [User]
        campgains: [Campaign]
        maps: [Map]
        characters: [Character]
    }

`;

/*const resolvers = {
    Query: {
      allUsers(parent, args) {
        return User.find({})
      }
    }
  };*/

const schema = makeExecutableSchema({typeDefs});//want to just use default resolvers
module.exports = schema;