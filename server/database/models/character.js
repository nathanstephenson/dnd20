const Mongoose = require('mongoose');

const characterSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
  campaign: { type: Mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  name: String,
  race: String,
  background: String,
  class: String,
  level: Number,
  hp: Number,
  cha: Number,
  con: Number,
  dex: Number,
  int: Number,
  str: Number,
  wis: Number,
  items: [String],
  proficiencies: [String],
});

const Character = Mongoose.model('Character', characterSchema);

module.exports = Character, characterSchema;

