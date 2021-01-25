const { Int32 } = require('mongodb');
const Mongoose = require('mongoose')
const mongouri = "mongodb+srv://dbadmin:2Vgv29KMGrHGFZIO@cluster0.g5wfg.mongodb.net/dnd20.users";
//uri might need these appended: ?retryWrites=true&w=majority
const mongo = Mongoose.connect(mongouri);

const userSchema = new Mongoose.Schema({
  _ID: String,
  username: String,//keep filling
  password: String,
  permissions: Int32,
});

const Users = Mongoose.model('User', userSchema);
module.exports = Users;

