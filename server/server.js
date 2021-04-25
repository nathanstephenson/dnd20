const path = require(`path`);
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '..', 'client');
//express server
const express = require(`express`);
const app = express();
const http = require('http')
//apollo server and mongodb connection
const { ApolloServer, gql, makeExecutableSchema, AuthenticationError } = require('apollo-server-express');
const {SubscriptionServer} = require('subscriptions-transport-ws')
const Mongoose = require('mongoose');
Mongoose.set('useFindAndModify', false);//makes Mongoose use findOneAndUpdate instead of findOneAndModify on MongoDB queries
const schema = require('./database/schema');
const mongouri = "mongodb+srv://dbadmin:2Vgv29KMGrHGFZIO@cluster0.g5wfg.mongodb.net/dnd20?retryWrites=true&w=majority";
const mongo = Mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to mongoDB")
});//connect to mongoDB with mongoose
const itemsAPI = require('./database/datasources/itemsAPI');
const characterAPI = require('./database/datasources/characterAPI');
/*const {  execute, subscribe  } = require('graphql')*/

const server = new ApolloServer({ schema: schema,
    context: mongo,
    dataSources: () => {//this is for 5eAPI
        return {
            itemsAPI: new itemsAPI(),
            characterAPI: new characterAPI(),
        };
    },
    tracing: true,
});

//connect the apollo server to express and serve the react app
server.applyMiddleware({ app, cors: true });
app.use(express.static(publicPath));
app.use(express.static(path.join(publicPath, 'build')));

//create designated HTTP server on the express instance so that subscriptions can be enabled over WS
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

//notification that the HTTP server is up with apollo
httpServer.listen(port, () => {
    console.log(`server is up on port ${port}${server.graphqlPath}!`);
});