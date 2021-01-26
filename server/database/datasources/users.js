const Mongoose = require('mongoose')
const mongouri = "mongodb+srv://dbadmin:2Vgv29KMGrHGFZIO@cluster0.g5wfg.mongodb.net/dnd20";
//uri might need these appended: ?retryWrites=true&w=majority
const mongo = Mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Mongoose.Schema({
  _id: String,
  username: String,
  password: String,
  permissions: Number,
  //keep filling
});

const Users = Mongoose.model('User', userSchema);
module.exports = Users;

