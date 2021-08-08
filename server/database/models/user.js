const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  username: String,
  password: String,
  permissions: Number,
  characters: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  campaigns: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
  maps: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
});

const User = Mongoose.model('User', userSchema);

module.exports = User, userSchema;

