const Mongoose = require('mongoose');

const campaignSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  name: String,
  dm: { type: Mongoose.Schema.Types.ObjectId, ref: 'users' },
  players: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'users' }],
  characters: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'characters' }]
});

const Campagin = Mongoose.model('campaigns', campaignSchema);

module.exports = Campagin, campaignSchema;

