const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://dbadmin:2Vgv29KMGrHGFZIO@cluster0.g5wfg.mongodb.net/dnd20?retryWrites=true&w=majority";

class Users extends SQLDataSource {
  /*getFruits() { (example query for sqldatasource)
    return this.knex
      .select("*")
      .from("fruit")
      .where({ id: 1 })
      .cache(MINUTE);
  }*/
}

module.exports = Users;