// sender_user_id
// receiver_user_id
// body
// creation_date_time
// last_update_date_time
const Mongoose = require('mongoose');

const messageSchema = new Mongoose.Schema({
    senderUserId: {type: String, required: true},
    receiverUserId: {type: String, required: true},
    body: {type: String, required: true},
    creationDateTime: {type: Date, required: true},
    lastUpdateDateTime: {type: Date, required: true}
}, {collection: "message"})

const MessageModel = Mongoose.model("Message", messageSchema);

module.exports = MessageModel;