const express = require('express');
const moment = require('moment');
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const port = 7000;

app.get('/', (req, res) => {
    res.status(200).send("<h1>Hello World</h1>");
})

app.get('*', (req, res) => {
    res.status(404).send("<h2>Not found</h2>")
})


app.post('/convertFrDateToUs', (req, res)=>{
    console.log(req.body);

    const frenchDate = req.body.frenchDate;

    if(!frenchDate) {
        res.status(404).json({error: 'frenchDate not found'})
    }
    if(!moment(frenchDate).isValid()) {
        res.status(500).json({error: 'Invalid date'});
    } else {
        const americanDate = moment(frenchDate).format('YYYY-MM-DD');
        res.status(200).json({americanDate})
    }
})

app.get('/name/:firstname', (req, res) => {
    const firstName = req.params.firstname;
    console.log(firstName);
    res.status(200).send('Hello '+firstName);
    res.send('Hello from thib!');
})

app.get('/name/georges', (req, res) => {
    console.log("req", req);
    res.send('Hello georges');
})

// app.get('/api', (req, res) => {
//     console.log("req", req);
//     res.status(200).json({status: 200, result: "ok"});
// })

// app.post('/msg', (req, res) => {
//     console.log("req", req);
//     // res.status(200).json({msg: "Le message envoyé est : " + req.body.msg})
// })



app.listen(port, () => {
    console.log(('connecté au port ' + port))
})