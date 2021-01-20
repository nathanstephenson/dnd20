const path = require(`path`);
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '..', 'client');
//express server
const express = require(`express`);
const app = express();
//apollo server and mongodb connection
const { ApolloServer, gql } = require('apollo-server-express');
const {typeDefs, resolvers} = require('./schema');
const MongoClient = require('mongodb').MongoClient;
import { Users } from './datasources/users.mjs';
const mongouri = "mongodb+srv://dbadmin:2Vgv29KMGrHGFZIO@cluster0.g5wfg.mongodb.net/dnd20?retryWrites=true&w=majority";
const mongo = new MongoClient(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });

//connect to mongodb
mongo.connect(err => {
    db = mongo.db("dnd20").collection("users");
    // perform actions on the collection object
    mongo.close();
});

const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers,
    dataSources: () => ({
        users: new Users(mongo.db().collection('users'))
    }) 
});
//connect the apollo server to express and serve the react app
server.applyMiddleware({ app });
app.use(express.static(publicPath));
app.use(express.static(path.join(publicPath, 'build')));
/*this doesnt seem to be doing anything
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});
*/

//notification that the express server is up with apollo
app.listen(port, () => {
    console.log(`server is up on port ${port}${server.graphqlPath}!`);
});