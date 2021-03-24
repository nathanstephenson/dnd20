const Mongoose = require('mongoose');

const campaignSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  name: String,
  dm: Mongoose.Schema.Types.ObjectId,
  players: [Mongoose.Schema.Types.ObjectId],
  characters: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Character' }]
});

const Campaign = Mongoose.model('Campaign', campaignSchema);

module.exports = Campaign, campaignSchema;

