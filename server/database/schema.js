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
        _id: ID
        name: String
        username: String
        password: String
        permissions: Int
        campgains: [Campaign]
        characters: [Character]
        maps: [Map]
    }

    type Query {
        user: User
        users: [User]
        campaign: Campaign
        campgains: [Campaign]
        map: Map
        maps: [Map]
        character: Character
        characters: [Character]
    }

    type Mutation {
        addUser(name:String, username:String, password:String): User
    }
`;

const schema = makeExecutableSchema({typeDefs, resolvers});
module.exports = schema;