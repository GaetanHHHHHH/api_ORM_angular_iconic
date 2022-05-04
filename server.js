// Imports
var express = require('express');
var bodyParser = require('body-parser');

// Instantiate server
var server = express();

// Body parser configuration
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue sur mon serveur</h1>');
});

// Lauch server
server.listen(8080, function() {
    console.log('Serveur en écoute');
});