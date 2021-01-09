const { gql } = require('apollo-server-express');

const characters = require('./data/characters');
const maps = require('./data/maps');
const campgains = require('./data/campgains');
const users = require('./data/users');

const typeDefs = gql`
    
    type Character {
        id: String!
        name: String
        campaign: String
        #stats, conditions, items, etc. taken from the public 5e API
    }

    type Map {
        id: String!
        creator: User!
        campaign: Campaign
        name: String
        entities: [Character]
        width: int
        height: int
        startCell: int
    }

    type Campaign {
        id: String!
        name: String
        DM: User!
        Characters: [Character]
        Maps: [Map]
        currentMap: Map
    }

    type User {
        id: String!
        username: String!
        password: String!
        access: int!
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
      campgains: () => campgains,
      maps: () => maps,
      characters: () => characters,
    },
};

module.exports = typeDefs, resolvers;