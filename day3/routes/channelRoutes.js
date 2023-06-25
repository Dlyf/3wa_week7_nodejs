const Channel = require('../models/channel');

function channelRoutes(app) {
    app.get('/channelByUser/:user_id', async (req, res)=>{
        const userId = req.params.user_id
        const channels = await Channel.aggregate([
            {
                $match: {$or: [{user1Id: userId}, {user2Id: userId}]}
            },
            {
                $lookup: {
                  from: "message",
                  localField: "_id",
                  foreignField: "channelId",
                  as: "messages"
                }
            }
        ])

        console.log(channels)

        if(channels.code) {
            res.status(channels.code).json(channels);
        }

        res.status(200).json({channels})
    })


}

module.exports = channelRoutes;