const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  username: String,
  password: String,
  permissions: Number,
  characters: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'characters' }],
  campaigns: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'campaigns' }],
});

const User = Mongoose.model('users', userSchema);

module.exports = User, userSchema;

