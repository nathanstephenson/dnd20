const { gql, makeExecutableSchema } = require('apollo-server-express');
const resolvers = require('./resolvers')
const apiTD = require('./apiSchema')

//unsure whether this works correctly with "!" on essential properties, or if better to just guarantee they are filled
const typeDefs = gql`
    
    type Character {
        _id: ID
        user: ID
        campaign: Campaign
        name: String
    }

    type Campaign {
        _id: ID
        name: String
        dm: ID
        players: [ID]
        characters: [Character]
    }

    type APIReference {
        index: String
        name: String
        url: String
    }

    type User {
        _id: ID
        name: String
        email: String
        username: String
        password: String
        permissions: Int
        campaigns: [Campaign]
        characters: [Character]
    }

    type Query {
        user(name:String, email:String, username:String, password:String): User
        userByID(id:String): User
        users: [User]
        campaign(id:String): Campaign
        campaignByID(id:String): Campaign
        campaigns: [Campaign]
        character(id:String): Character
        characters: [Character]
        equipmentCategories: [APIReference]
        equipment(id:String): Equipment
    }

    type Mutation {
        addUser(name:String, email:String, username:String, password:String): User
        addCampaign(dm:String, name:String): Campaign
        deleteCampaign(user:String, dm:String, campaign:String): String
        renameCampaign(id:String, name:String): Campaign
        addCharacter(user:String, campaign:String, name:String): Character
    }

    type Subscription {
        userUpdate(id:String):User
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
}


    type APIReference {
        index: String
        name: String
        url: String
    }

    type Choice {
        choose: Int
        type: String
        from: [APIReference]
    }

    type Equipment {
        _id: String!
        armor_category: String
        armor_class: EquipmentArmor_class
        capacity: String
        category_range: String
        contents: [EquipmentContents]
        cost: EquipmentCost
        damage: EquipmentDamage
        desc: [String]
        equipment_category: AbilityScoreSkills
        gear_category: AbilityScoreSkills
        index: String
        name: String
        properties: [AbilityScoreSkills]
        quantity: Float
        range: EquipmentRange
        special: [String]
        speed: EquipmentSpeed
        stealth_disadvantage: Boolean
        str_minimum: Float
        throw_range: EquipmentThrow_range
        tool_category: String
        two_handed_damage: EquipmentTwo_handed_damage
        url: String
        vehicle_category: String
        weapon_category: String
        weapon_range: String
        weight: Float
      }*/
const td = [apiTD,typeDefs]
const schema = makeExecutableSchema({typeDefs: td, resolvers});
module.exports = schema;