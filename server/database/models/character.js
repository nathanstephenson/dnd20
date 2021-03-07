const Mongoose = require('mongoose');

const characterSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  user: { type: Mongoose.Schema.Types.ObjectId, ref: 'users' },
  campaign: { type: Mongoose.Schema.Types.ObjectId, ref: 'campaigns' },
  name: String,
  //keep filling
});

const Character = Mongoose.model('characters', characterSchema);

module.exports = Character, characterSchema;

