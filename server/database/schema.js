const { gql, makeExecutableSchema } = require('apollo-server-express');
const resolvers = require('./resolvers')

//unsure whether this works correctly with "!" on essential properties, or if better to just guarantee they are filled
const typeDefs = gql`
    
    type Character {
        _id: ID
        user: User
        campaign: Campaign
        name: String
    }

    type Campaign {
        _id: ID
        name: String
        dm: User
        players: [User]
        characters: [Character]
    }

    type User {
        _id: ID
        name: String
        email: String
        username: String
        password: String
        permissions: Int
        campgains: [Campaign]
        characters: [Character]
    }

    type Query {
        user(name:String, email:String, username:String, password:String): User
        userByID(_id: ID!): User
        users: [User]
        campaign: Campaign
        campaignByID(_id: ID): Campaign
        campgains: [Campaign]
        character: Character
        characters: [Character]
    }

    type Mutation {
        addUser(name:String, email:String, username:String, password:String): User
        addCampaign(dm:ID, name:String): Campaign
        addCharacter(user:ID, campaign:ID, name:String): Character
    }
`;

/* type Map {
    _id: ID!
    creator: User!
    campaign: Campaign
    name: String
    entities: [Character]
    width: Int
    height: Int
    startCell: Int
} */
const schema = makeExecutableSchema({typeDefs, resolvers});
module.exports = schema;