const Mongoose = require('mongoose');

const characterSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
  campaign: { type: Mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  name: String,
  //keep filling
});

const Character = Mongoose.model('Character', characterSchema);

module.exports = Character, characterSchema;

