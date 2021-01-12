const { gql } = require('apollo-server-express');

/*
const characters = require('./data/characters');
const maps = require('./data/maps');
const campaigns = require('./data/campaigns');
const users = require('./data/users');
*/
const typeDefs = gql`
    
    type Character {
        id: ID!
        name: String
        campaign: String
    }

    type Map {
        id: ID!
        creator: User!
        campaign: Campaign
        name: String
        entities: [Character]
        width: Int
        height: Int
        startCell: Int
    }

    type Campaign {
        id: ID!
        name: String
        DM: User!
        Characters: [Character]
        Maps: [Map]
        currentMap: Map
    }

    type User {
        id: ID!
        username: String!
        password: String!
        access: Int!
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
/*these queries are maybe also not valid
const resolvers = {
    Query: {
      users: () => users,
      campaigns: () => campaigns,
      maps: () => maps,
      characters: () => characters,
    }
};
*/
module.exports = typeDefs;