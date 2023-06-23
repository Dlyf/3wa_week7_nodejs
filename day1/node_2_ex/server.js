const express = require('express');
const app = express()

const port = 7000;

app.get('/', (req, res) => {
    res.status(200).send("<h1>Hello World!</h1>");
})

app.get('/profil', (req, res) => {
    console.log("req", req);
    res.status(200).send("<h1>Hello form profil!</h1>");
})

app.get('/api', (req, res) => {
    console.log("req", req);
    res.status(200).json({status: 200, result: "ok"});
})

// app.post('/msg', (req, res) => {
//     console.log("req", req);
//     // res.status(200).json({msg: "Le message envoyé est : " + req.body.msg})
// })

app.post('/msg', (req, res)=>{
    console.log(req.body);

    if(req.body.msg) {
        res.status(200).json({msg: "Le message envoyé est : "+req.body.msg})
    } else {
        res.status(500).json({msg: "pas de message depuis le front"})
    }
})

app.listen(port, () => {
    console.log(('connecté au port' + port))
})