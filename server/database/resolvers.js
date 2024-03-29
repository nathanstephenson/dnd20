const { PubSub, withFilter } = require('apollo-server-express');
const Mongoose = require('mongoose');
const Campaign = require('./models/campaign');
const Character = require('./models/character');
const Session = require('./models/session');
const User = require('./models/user');
const Map = require('./models/map')

const pubsub = new PubSub()//only works for a single server instance, so would need an alternative for cloud deployment
async function publishSession(session){//pushes the session for live gameplay
    const payload = await Session.findById(session).populate('characters.character').populate('map')//positional operator "$" makes sure the mutation happens to the corrent object in the array
    await pubsub.publish('SESSION_UPDATED', payload)
    return "done"
}

const resolvers = {
    Query: {
        rollDie(root, args, context){
            var n = (Math.random())*args.sides
            return Math.floor(n+1)
        },
        users(root, args, context){
            return User.find().populate('campaigns');
        },
        user(root, args, context){
            return User.findById(args.id).populate('characters').populate('campaigns');
        },
        async doesUserExist(root, args, context){
            const user = await User.findOne({username: args.username})
            if(user!==null){return true}else{return false}
        },
        async getUserID(root, args, context){ 
            const user = await User.findOne({username: args.username, password: args.password})
            if(user!==null){return user._id}else{return undefined}
        },
        campaigns(root, args, context){
            return Campaign.find().populate('characters');
        },
        campaign(root, args, context){
            return Campaign.findOne({_id:Mongoose.Types.ObjectId(args.id)}).populate({path:'characters', populate:{path:'user'}})
        },
        async players(root, args, context){
            const campaign = await Campaign.findOne({_id:Mongoose.Types.ObjectId(args.campaign)})
            //console.log(campaign)
            const players = []
            if(campaign.players.length >= 1){
                for (let i = 0; i < campaign.players.length; i++){
                    const u = await User.findById(campaign.players[i]).populate('characters')
                    players.push(u)
                }
            }
            console.log(players)
            return players
        },
        characters(root, args, context){
            return Character.find();
        },
        character(root, args, context){
            return Character.findOne({_id:Mongoose.Types.ObjectId(args.id)});
        },
        map(root, args, context){
            return Map.findById(args.id)
        },
        async getCurrentSessionID(root, args, context){
            const campaign = await Campaign.findOne({_id:Mongoose.Types.ObjectId(args.campaign)});
            return campaign.currentSession;
        },
        session(root, args, context){
            return Session.findById(args.id).populate('characters.character').populate('map')
        },
        //---------------5eAPI queries, async because api returns promise
        async classes(root,args,{dataSources}){
            return await dataSources.characterAPI.getClasses()
        },
        async class(root,args,{dataSources}){
            return await dataSources.characterAPI.getClass(args.index)
        },
        async races(root, args, {dataSources}){
            return await dataSources.characterAPI.getRaces()
        },
        async race(root,args,{dataSources}){
            return await dataSources.characterAPI.getRace(args.index)
        },
        async equipmentCategories(root, args, {dataSources}){
            return await dataSources.itemsAPI.getCategories();
        },
        async equipment(root, args, {dataSources}){
            return await dataSources.itemsAPI.getEquipment(args.id)
        },
        async abilityScores(root, args, {dataSources}){
            return await dataSources.characterAPI.getAbilityScores()
        },
    },

    Mutation: {
        addUser(root, args, context){
            return User.create({
                _id: Mongoose.Types.ObjectId(),
                name: args.name,
                email: args.email,
                username: args.username,
                password: args.password,
                permissions: 1
            });
        },
        /* async clearUsers(root, args, context){ LEAVE THIS COMMENTED OUT IT IS ONLY FOR DEVELOPMENT
            await User.deleteMany({permissions:1})
            return "deleted users"
        }, */
        async addCampaign(root, args, context){
            const newID = Mongoose.Types.ObjectId()
            await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.dm)}, {$addToSet:{campaigns:newID}})
            return await Campaign.create({
                _id: newID,
                name: args.name,
                dm: Mongoose.Types.ObjectId(args.dm),
            })
        },
        async joinCampaign(root, args, context){
            //need to wipe character from other campaigns and sessions before this
            await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.user)}, {$addToSet:{campaigns:Mongoose.Types.ObjectId(args.id)}})
            return await Campaign.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {$addToSet:{players:Mongoose.Types.ObjectId(args.user)}}, {new:true})
        },
        async leaveCampaign(root, args, context){
            const user = await User.findByIdAndUpdate(Mongoose.Types.ObjectId(args.user), {$pull:{campaigns:Mongoose.Types.ObjectId(args.campaign)}}, {new:true}).populate('characters')
            await Campaign.findByIdAndUpdate(Mongoose.Types.ObjectId(args.campaign), {$pull:{players:Mongoose.Types.ObjectId(args.user)}})
            await user.characters.forEach(element => {
                if (String(element.campaign) === String(args.campaign)){
                    console.log(Mongoose.Types.ObjectId(element._id))//shows in console
                    Campaign.findByIdAndUpdate(Mongoose.Types.ObjectId(args.campaign), {$pull:{characters:Mongoose.Types.ObjectId(element._id)}})//THIS DOESN'T EVEN RUN WHEN THE SPECIFIC CHARACTER ID IS USED
                    Character.findByIdAndUpdate(element._id, {$set:{campaign:null}})//setting to null doesnt work
                    console.log("match")
                }
            })
            console.log("done", args.user, args.campaign)
            return await Campaign.findById(args.campaign).populate({path:'characters', populate:{path:'user'}})
        },
        async deleteCampaign(root, args, context){
            const campaign = await Campaign.findById(args.campaign)
            if(args.user === args.dm){//all args here are IDs
                await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.dm)}, {$pull:{campaigns:Mongoose.Types.ObjectId(args.campaign)}})
                await campaign.players.forEach(element => {
                    User.findByIdAndUpdate(element, {$pull:{campaigns:Mongoose.Types.ObjectId(args.campaign)}})
                })
                await campaign.characters.forEach(element => {
                    Character.findByIdAndUpdate(element, {$set:{campaign:null}})//this doesn't work, check for null campaign may just have to be on the client side
                })
                await Campaign.findByIdAndDelete(args.campaign)
            }
            return "ran campaign deletion"
        },
        renameCampaign(root, args, context){
            return Campaign.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {name:args.name}, {new:true});//, {upsert:true}
        },
        async addCharacter(root, args, context){
            const newID = Mongoose.Types.ObjectId()
            await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.user)}, {$addToSet:{characters:newID}})
            const campaign = await Campaign.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.campaign)}, {$addToSet:{characters:newID}})
            if(campaign.session !== null){
                await Session.findByIdAndUpdate(campaign.currentSession, {$addToSet:{characters:{
                    _id: newID,
                    character: newID,
                    position: 0,
                }}})
            }
            return await Character.create({
                _id: newID,
                user: Mongoose.Types.ObjectId(args.user),
                campaign: Mongoose.Types.ObjectId(args.campaign),
                name: args.name,
                race: args.race,
                background: args.background,
                class: "",
                level: 0,
                cha: 10,
                con: 10,
                dex: 10,
                int: 10,
                str: 10,
                wis: 10,
            })
        },
        async updateCharacterInfo(root, args, context){
            const char = await Character.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {$set:{name:args.name, campaign:args.campaign}})
            if(Mongoose.Types.ObjectId(args.campaign) != char.campaign){
                await Campaign.findByIdAndUpdate(char.campaign, {$pull:{characters:Mongoose.Types.ObjectId(args.id)}})
                const campaign = await Campaign.findByIdAndUpdate(args.campaign, {$addToSet:{characters:Mongoose.Types.ObjectId(args.id)}}, {new:true})
                //session update for joining an active campaign
                if(campaign.session !== null){
                    await Session.findByIdAndUpdate(campaign.currentSession, {$addToSet:{characters:{
                        _id: newID,
                        character: newID,
                        position: 0,
                    }}})
                    await pubsub.publish('SESSION_UPDATED', payload)
                }
            }
            return await Character.findById(args.id)
        },
        async updateCharacterStats(root, args, context){
            return await Character.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {$set:{class:args.class, cha:args.cha, con:args.con, dex:args.dex, int:args.int, str:args.str, wis:args.wis}}, {new:true})
        },
        async updateCharacterSkills(root, args, context){
            console.log("sent")
            return await Character.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.id)}, {$set:{skills:args.skills}}, {new:true})
        },
        async deleteCharacter(root, args, context){
            await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.user)}, {$pull:{characters:args.character}})
            const campaign = await Campaign.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.campaign)}, {$pull:{characters:args.character}})
            await Session.findOneAndUpdate({_id: campaign.currentSession}, {$pull: {characters:{_id: args.character}}})
            await Character.findByIdAndDelete(args.character)
            return "ran character deletion"
        },
        async createMap(root, args, context){
            const newID = Mongoose.Types.ObjectId()
            await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.creator)}, {$addToSet:{maps:newID}})
            return await Map.create({
                _id: newID,
                creator: Mongoose.Types.ObjectId(args.creator),
                name: args.name,
                width: args.width,
                height: args.height,
            })
        },
        async deleteMap(root, args, context){
            const m = await Map.findById(args.map)
            console.log(m.creator, args.user)
            if(String(m.creator)===args.user){
                console.log("match")
                await User.findOneAndUpdate({_id:Mongoose.Types.ObjectId(args.user)}, {$pull:{maps:args.map}})
                await Map.findByIdAndDelete(args.map)
            }
            return "ran map deletion"
        },
        async createSession(root, args, context){//sometimes doesnt transfer all characters?
            const newID = Mongoose.Types.ObjectId()
            const campaign = await Campaign.findById(args.campaign)
            if(String(args.user) === String(campaign.dm)){
                await Campaign.findByIdAndUpdate(Mongoose.Types.ObjectId(args.campaign), {$set: {currentSession:newID}})
                const characters = []
                for await (const character of campaign.characters){
                    characters.push({
                        _id: Mongoose.Types.ObjectId(character._id),
                        character: Mongoose.Types.ObjectId(character._id),
                        position: campaign.characters.indexOf(character),
                    })
                }
                return await Session.create({
                    _id: newID,
                    dm: Mongoose.Types.ObjectId(args.user),
                    campaign: Mongoose.Types.ObjectId(args.campaign),
                    characters: characters
                })
            }
        },
        async endSession(root, args, context){
            const campaign = await Campaign.findById(args.campaign)
            if(String(args.user) === String(campaign.dm)){
                await Campaign.findByIdAndUpdate(args.campaign, {$addToSet:{sessionHistory:campaign.currentSession}, $set:{currentSession:null}})
            }
            return "done"
        },
        //play screen
        async changeMap(root, args, context){
            await Session.findOneAndUpdate({_id: Mongoose.Types.ObjectId(args.session)}, {$set: {'map': Mongoose.Types.ObjectId(args.map)}})
            return await publishSession(args.session)
        },
        async changeCharacterPos(root, args, context){
            await Session.findOneAndUpdate({_id: Mongoose.Types.ObjectId(args.session), 'characters._id': Mongoose.Types.ObjectId(args.character)}, {$set: {'characters.$.position': args.position}})
            return await publishSession(args.session)
        },
        async changeCharacterHealth(root, args, context){
            await Character.findOneAndUpdate({_id: Mongoose.Types.ObjectId(args.character)}, {$set: {hp: args.hp}}, {new:true})//positional operator "$" makes sure the mutation happens to the corrent object in the array
            return await publishSession(args.session)
        },
    },

    Subscription: {
        sessionUpdate: {
            subscribe: withFilter(() => pubsub.asyncIterator('SESSION_UPDATED'),
                (payload, args)=>{
                    return (String(payload._id)===args.id)//pushes subscription to client if their sessionID is the same as the updated one
                }
            ),
            resolve: (payload) => { return payload },
        },
    }
};

module.exports = resolvers;