const Mongoose = require('mongoose')
/*const mongouri = "mongodb+srv://dbadmin:2Vgv29KMGrHGFZIO@cluster0.g5wfg.mongodb.net/dnd20";
//uri might need these appended: ?retryWrites=true&w=majority, maybe isnt even doing anything here
Mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });*/

const userSchema = new Mongoose.Schema({
  _id: String,
  name: String,
  username: String,
  password: String,
  permissions: Number,
  //keep filling
});

const User = Mongoose.model('users', userSchema);

module.exports = User;

