const Mongoose = require('mongoose');

const mapSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  creator: Mongoose.Schema.Types.ObjectId,
  campaign: Mongoose.Schema.Types.ObjectId,
  
});

const Map = Mongoose.model('Map', mapSchema);

module.exports = Map, mapSchema;