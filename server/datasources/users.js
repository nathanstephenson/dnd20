const { SQLDataSource } = require("datasource-sql");

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