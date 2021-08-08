const Mongoose = require('mongoose');

const sessionSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  dm: Mongoose.Schema.Types.ObjectId,
  campaign: Mongoose.Schema.Types.ObjectId,
  map: { type: Mongoose.Schema.Types.ObjectId, ref: 'Map' },
  characters: [{
    _id: Mongoose.Schema.Types.ObjectId,
    character: { type: Mongoose.Schema.Types.ObjectId, ref: 'Character' },
    position: Number
  }],
});

const Session = Mongoose.model('Session', sessionSchema);

module.exports = Session, sessionSchema;
