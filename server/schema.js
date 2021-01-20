const { gql } = require('apollo-server-express');

/*
const characters = require('./datasources/characters');
const maps = require('./datasources/maps');
const campaigns = require('./datasources/campaigns');
const users = require('./datasources/users');
*/
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
const resolvers = {
    Query: {
      users: () => users,
      //campaigns: () => campaigns,
      //maps: () => maps,
      //characters: () => characters,
    }
};

module.exports = typeDefs, resolvers;