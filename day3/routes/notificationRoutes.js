// routes :
// enregistre une notif
// récupère toutes le notifs d'un receiverUserID
// update view

const Notification = require('../models/notification')
const withAuth = require('../withAuth')


function notificationRoutes(app){
    app.post('/notification/add', async (req, res)=>{
        const data = {
            actionUserId: req.body.actionUserId,
            receiverUserId: req.body.receiverUserId,
            action: req.body.action,
            creationDateTime: new Date(),
            view: req.body.view
        }
        const notification = new Notification(data);
        const result = await notification.save();
        console.log(result)
        if(result.code) {
            res.status(result.code).json({result})
            return;
        }
        res.status(200).json({result})
    })

    app.get('/notification/all', async (req, res)=>{
        const notifications = await Notification.find({});

        if(notifications.code) {
            res.status(notifications.code).json({notifications})
        }

        res.status(200).json({notifications})

    })

    app.get('/notificationByUser/:user_id', withAuth,async (req, res)=>{
        const user_id = req.params.user_id;
        const notifications = await Notification.find({$or: [{actionUserId: user_id}, {receiverUserId: user_id}]});

        if(notifications.code) {
            res.status(notifications.code).json({notifications})
        }

        res.status(200).json({notifications})
    })

    app.get('/notification/:id', withAuth,async (req, res)=>{
        const id = req.params.id;
        const notification = await Notification.findOne({_id: id});

        if(notification.code) {
            res.status(notification.code).json({notification})
        }

        res.status(200).json({notification})
    })

    app.delete('/notification/:id', withAuth, async (req, res)=>{
        const id = req.params.id;
        const notification = await Notification.findOne({_id: id})
        console.log(notification)
        if(notification.code) {
            res.status(notification.code).json({notification})
        }
        const result = await Notification.deleteOne({_id: id});

        if(result.code) {
            res.status(result.code).json({result})
        }

    })

    app.put('/notification/:id',withAuth, async (req, res)=>{
        const id = req.params.id;
        const result = await Notification.updateOne({_id: id}, {action: req.body.action});

        if(result.code) {
            res.status(result.code).json({result})
        }

        const notification = await Notification.findOne({_id: id})
        console.log(notification)
        if(notification.code) {
            res.status(notification.code).json({notification})
        }
    })
}

module.exports = notificationRoutes