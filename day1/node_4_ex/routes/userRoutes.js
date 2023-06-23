const users = [
    {id: 1, name: 'Tom', age: 30},
    {id: 2, name: 'Cindy', age: 20},
    {id: 3, name: 'Sid', age: 40},
    {id: 4, name: 'Emma', age: 5},
]


function userRoutes(app){

    app.get('/user/all', (req, res)=>{
        res.status(200).json({users})
    });


    app.get('/user/:id', (req, res)=>{
        const id = parseInt(req.params.id)
        const user = users.find((u)=> u.id === id);

        if(!user) {
            res.status(404).json({error: "user not found"})
        }

        res.status(200).json({user})
    })

}

module.exports = userRoutes;