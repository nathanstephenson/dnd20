const Mongoose = require('mongoose');

const mapSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  creator: Mongoose.Schema.Types.ObjectId,
  name: String,
  width: Number,
  height: Number
});

const Map = Mongoose.model('Map', mapSchema);

module.exports = Map, mapSchema;