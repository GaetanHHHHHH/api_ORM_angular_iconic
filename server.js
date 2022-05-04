// Imports
var express = require('express');

// Instantiate server
var server = express();


// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue sur mon serveur</h1>');
});

// Lauch server
server.listen(8080, function() {
    console.log('Serveur en écoute');
});