const { gql, makeExecutableSchema } = require('apollo-server-express');
const resolvers = require('./resolvers')
const apiTD = require('./apiSchema')

//unsure whether this works correctly with "!" on essential properties, or if better to just guarantee they are filled
const typeDefs = gql`
    
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
        currentSession: ID
    }

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
    }

    type CharacterReference {
        _id: ID!
        character: Character!
        position: Int!
    }

    type Session {
        _id: ID!
        campaign: ID
        characters: [CharacterReference]
    }

    type Query {
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
        classes: [Class]
        class(index:String): Class
        races: [Race]
        race(index:String): Race
        equipmentCategories: [APIReference]
        equipment(id:String): Equipment
        abilityScores: [AbilityScore]
        getCurrentSessionID(campaign:String): String
        session(id:String):Session
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