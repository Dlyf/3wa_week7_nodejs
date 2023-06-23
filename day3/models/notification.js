// actionUserId
// receiverUserId
// action (newMessage, deleteMessage, ...)
// creationDateTime
// view (bool)
// message


const Mongoose = require('mongoose');

const notificationSchema = new Mongoose.Schema({
    actionUserId: {type: String, required: true},
    receiverUserId: {type: String, required: true},
    action: {type: String, required: true},
    creationDateTime: {type: Date, required: true},
    view: {type: Boolean, required: true}
}, {collection: "notification"})

const NotificationModel = Mongoose.model("Notification", notificationSchema);

module.exports = NotificationModel;