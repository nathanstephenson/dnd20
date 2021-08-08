const { gql, makeExecutableSchema } = require('apollo-server-express');
const resolvers = require('./resolvers')
const apiTD = require('./apiSchema')

//unsure whether this works correctly with "!" on essential properties, or if better to just guarantee they are filled
const typeDefs = gql`
    
    type APIReference {
        index: String
        name: String
        url: String
    }

    type User {
        _id: ID!
        name: String
        email: String
        username: String
        password: String
        permissions: Int
        campaigns: [Campaign]
        characters: [Character]
        maps: [Map]
    }

    type Character {
        _id: ID!
        user: User
        campaign: ID
        name: String
        race: String,
        background: String,
        class: String,
        level: Int,
        hp: Int,
        cha: Int,
        con: Int,
        dex: Int,
        int: Int,
        str: Int,
        wis: Int,
        items: [String],
        skills: [String],
    }

    type Campaign {
        _id: ID!
        name: String
        dm: ID
        players: [ID]
        characters: [Character]
        maps: [ID]
        currentSession: ID
    }

    type Map {
        _id: ID!
        creator: ID!
        name: String
        width: Int
        height: Int
    }

    type Session {
        _id: ID!
        dm: ID
        campaign: ID
        map: Map
        characters: [CharacterReference]
    }

    type CharacterReference {
        _id: ID!
        character: Character!
        position: Int!
    }

    type Query {
        rollDie(sides:Int): Int
        doesUserExist(username:String): Boolean
        getUserID(username:String, password:String):String
        user(id:String): User
        users: [User]
        campaign(id:String): Campaign
        campaignByID(id:String): Campaign
        campaigns: [Campaign]
        players(campaign:String):[User]
        character(id:String): Character
        characters: [Character]
        getCurrentSessionID(campaign:String): String
        map(id:String): Map
        session(id:String): Session
        classes: [Class]
        class(index:String): Class
        races: [Race]
        race(index:String): Race
        equipmentCategories: [APIReference]
        equipment(id:String): Equipment
        abilityScores: [AbilityScore]
    }

    type Mutation {
        addUser(name:String, email:String, username:String, password:String): User
        clearUsers:String
        addCampaign(dm:String, name:String): Campaign
        joinCampaign(id:String, user:String):Campaign
        leaveCampaign(campaign:String, user:String):Campaign
        deleteCampaign(user:String, dm:String, campaign:String): String
        renameCampaign(id:String, name:String): Campaign
        addCharacter(user:String, campaign:String, name:String, race:String, background:String): Character
        deleteCharacter(user:String, character:String, campaign:String):String
        updateCharacterInfo(id:String, name:String, campaign:String):Character
        updateCharacterStats(id:String, class:String, level:Int, int:Int, str:Int, dex:Int, con:Int, wis:Int, cha:Int):Character
        updateCharacterSkills(id:String, skills:[String]):Character
        createMap(creator: String, name:String, width: Int, height: Int): Map
        deleteMap(user:String, map:String): String
        changeMap(user:String, session:String, map:String):String
        createSession(campaign:String, user:String):Session
        endSession(campaign:String, user:String):String
        changeCharacterPos(session:String, character:String, position:Int):String
        changeCharacterHealth(session:String, character:String, hp:Int):String
    }

    type Subscription {
        sessionUpdate(id:String):Session
    }
`;

/* 
user(name:String, email:String, username:String, password:String): User

type Map {
    _id: ID!
    creator: User!
    campaign: Campaign
    name: String
    entities: [Character]
    width: Int
    height: Int
    startCell: Int
}*/
const td = [apiTD,typeDefs]
const schema = makeExecutableSchema({typeDefs: td, resolvers});
module.exports = schema;