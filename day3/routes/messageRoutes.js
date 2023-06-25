const Message = require('../models/message')
const Notification = require('../models/notification')
const User = require('../models/user')
const Channel = require('../models/channel');
const withAuth = require('../withAuth')

function messageRoutes(app, io){
    app.post('/message/add', withAuth, async (req, res)=>{

        let channelId = "";

        if(req.body.channelId === null ) {
            const data = {
                user1Id: "6492ce03c29364279f5d025b",
                user2Id: "6494034774968b23e7943228",
                creationDateTime: new Date()
            }
            const channel = new Channel(data);
            const resultChannel = await channel.save();

            if(resultChannel.code) {
                res.status(resultChannel.code).json(resultChannel);
                return;
            }
             console.log("resultChannel", resultChannel)   
             channelId = resultChannel._id
        }


        const data = {
            senderUserId: req.body.senderUserId,
            receiverUserId:  req.body.receiverUserId,
            body: req.body.body,
            creationDateTime: new Date(),
            lastUpdateDateTime: new Date(),
            channelId: channelId
        }

        const message = new Message(data);
        const result = await message.save();
        console.log(result)
        if(result.code) {
            res.status(result.code).json({result})
            return;
        }

        const user = await User.findOne({_id: req.body.senderUserId});

        if(user.code) {
            res.status(user.code).json({user})
            return;
        }

        const dataNotification = {
            actionUserId: req.body.senderUserId,
            receiverUserId:  req.body.receiverUserId,
            action: "sendMessage",
            message: user.firstName+' vous a envoyé un message',
            view: false,
            creationDateTime: new Date()
        }

        const notification = new Notification(dataNotification);

        const resultNotif = await notification.save();

        if(resultNotif.code) {
            res.status(resultNotif.code).json({resultNotif})
            return;
        }

        io.emit('newMessage', {receiverUserId: req.body.receiverUserId})
        res.status(200).json({result, resultNotif, channelId})

    })

    app.get('/message/all', withAuth,async (req, res)=>{
        const messages = await Message.find({});

        if(messages.code) {
            res.status(messages.code).json({messages})
        }

        res.status(200).json({messages})
    })

    app.get('/messageByUser/:user_id', withAuth,async (req, res)=>{
        const user_id = req.params.user_id;
        const messages = await Message.find({$or: [{senderUserId: user_id}, {receiverUserId: user_id}]});

        if(messages.code) {
            res.status(messages.code).json({messages})
        }

        res.status(200).json({messages})
    })


    app.get('/message/:id', withAuth,async (req, res)=>{
        const id = req.params.id;
        const message = await Message.findOne({_id: id});

        if(message.code) {
            res.status(message.code).json({message})
        }

        res.status(200).json({message})
    })

    app.delete('/message/:id', withAuth, async (req, res)=>{
        const id = req.params.id;
        const message = await Message.findOne({_id: id})
        console.log(message)
        if(message.code) {
            res.status(message.code).json({message})
        }
        const result = await Message.deleteOne({_id: id});

        if(result.code) {
            res.status(result.code).json({result})
        }
        io.emit('updateDeleteMessage', {receiverUserId: message.receiverUserId, senderUserId: message.senderUserId})
        res.status(200).json({result})

    })

    app.put('/message/:id',withAuth, async (req, res)=>{
        const id = req.params.id;
        const result = await Message.updateOne({_id: id}, {body: req.body.body});

        if(result.code) {
            res.status(result.code).json({result})
        }

        const message = await Message.findOne({_id: id})
        console.log(message)
        if(message.code) {
            res.status(message.code).json({message})
        }

        io.emit('updateDeleteMessage', {receiverUserId: message.receiverUserId, senderUserId: message.senderUserId})

        //io.emit('newMessage', {receiverUserId: req.body.receiverUserId})
        res.status(200).json({result})
    })
}

module.exports = messageRoutes