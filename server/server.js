const express = require(`express`);
const path = require(`path`);
const app = express();
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '..', 'client');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./schema');
const MongoClient = require('mongodb').MongoClient;
const mongouri = "mongodb+srv://dbadmin:2Vgv29KMGrHGFZIO@cluster0.g5wfg.mongodb.net/dnd20?retryWrites=true&w=majority";
const mongo = new MongoClient(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });
const server = new ApolloServer({ typeDefs: typeDefs });

server.applyMiddleware({ app });

app.use(express.static(publicPath));
app.use(express.static(path.join(publicPath, 'build')));
/*this doesnt seem to be doing anything
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});
*/
app.listen(port, () => {
    console.log(`server is up on port ${port}${server.graphqlPath}!`);
});

mongo.connect(err => {
    const collection = mongo.db("test").collection("devices");
    // perform actions on the collection object
    mongo.close();
});

//line below is how to connect to private db
//mongo "mongodb+srv://cluster0.g5wfg.mongodb.net/<dbname>" --username dbadmin