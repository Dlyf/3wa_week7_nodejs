const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 5002;
const cors = require('cors')
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes')

var whitelist = ['http://localhost:9001', 'http://localhost:5002']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptons))
// app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use s'applique sur toutes les routes
app.use(bodyParser.json())

restaurantRoutes(app);
userRoutes(app);

app.listen(port, ()=>{
    console.log("Conneté au port "+port)
})