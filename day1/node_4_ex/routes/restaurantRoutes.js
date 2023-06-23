const restaurants = [
    {id: 1, name: 'Le délice', priceAverage: 30},
    {id: 2, name: 'Le fabuleux', priceAverage: 20},
    {id: 3, name: 'Le ténébreux', priceAverage: 40},
    {id: 4, name: 'Le bof', priceAverage: 5},
]


function restaurantRoutes(app){

    app.get('/restaurant/all', (req, res)=>{
        res.status(200).json({restaurants})
    });


    app.get('/restaurant/:id', (req, res)=>{
        const id = parseInt(req.params.id)
        const restaurant = restaurants.find((resto)=> resto.id === id);

        if(!restaurant) {
            res.status(404).json({error: "restaurant not found"})
        }

        res.status(200).json({restaurant})
    })

}

module.exports = restaurantRoutes;