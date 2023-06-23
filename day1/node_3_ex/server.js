const express = require('express');
const app = express();
const port = 9001;
const bodyParser = require('body-parser');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

// app.get("/", (req, res)=>{
//     res.render('layout', {template: 'home', name:'Carl'});
// })

// app.get("/profil", (req, res)=>{
//     res.render('layout', {template: 'profil', name:'Carl'});
// })
app.get("/", (req, res)=>{
    res.render('layout', {template: 'home'});
})

app.get("/profil", (req, res)=>{
    res.render('layout', {template: 'profil'});
})

app.get('/list', (req, res)=>{
    const students = [
        {name: 'Riri', age: 8},
        {name: 'Fifi', age: 9},
        {name: 'Loulou', age: 10}
    ]
    // res.render('layout', {template: 'profil'})
    res.render('layout', {template: 'list', students, number: 2});

})
app.listen(port, () => {
    console.log("Connecté au port " + port)
})