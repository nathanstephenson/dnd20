import MongoDataSource from 'apollo-datasource-mongodb'
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbadmin:2Vgv29KMGrHGFZIO@cluster0.g5wfg.mongodb.net/dnd20/users?retryWrites=true&w=majority";

class Users extends MongoDataSource {
  constructor(collection){
    super();
    this.collection = collection;
  }
  
  getUser(id) {
    return this.collection.findOneById(id);
  }
  newUser(User){
    this.collection.insertOne(User);
  }
}
module.exports.default = Users;//wtf do i do, need to find a way to pass this class in a normal js func