const Mongoose = require('mongoose');

const channelSchema = new Mongoose.Schema({
    user1Id: {type: String, required: true},
    user2Id:  {type: String, required: true},
    creationDateTime: {type: Date, required: true},
}, {collection: "channel"})

const ChannelModel = Mongoose.model("Channel", channelSchema);

module.exports = ChannelModel;