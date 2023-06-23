// pour récupérer des modules natif à node : require
const fs = require('fs')
const os = require('os');
const http = require('http');
const express = require('express');
const {addition, soustraction} = require('./calcul')
const host = 'localhost';
const port = 8000; 

// console.log("test");
// 1er méthode
// function addition(a,b) {
//     return a + b;
// }


// console.log(addition(1, 3))
console.log(soustraction(5, 3));
;
// console.log(global)
// console.log(os)
const requestListener = function ( req, res) {

    console.log(req);
    switch(req.url) {
        case "/":
            res.writeHead(200);
            res.end("<h1>Hello form Profil!</h1>");
        break;

        case "/profil":
            res.writeHead(200);
            res.end("<h1>Hello form Profil!</h1>");
        break;

        case "/api":
            res.writeHead(200);
            res.end("<h1>Hello form Profil!</h1>");
        break;

        default:
            // res.writeHead(404);
            res.writeHead(500);
            res.end("<h1>Not found!</h1>")
        break;
    }

    // 1er méthode 
    // if(req.url === "/profil") {
    //     res.writeHead(200);
    //     res.end("<h1>Hello form Profil!</h1>");
    // } else {
    //     res.writeHead(200);
    //     res.end("Hello from server");

    // }
}
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is runnig on http://${host}:${port}`)
});