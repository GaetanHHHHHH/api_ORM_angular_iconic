// Imports
var express = require('express');
var expresshbs = require('express-handlebars');
var bodyParser = require('body-parser');
const { sequelize } = require('./models');
const path = require('path');

// Instantiate server
var server = express();

// Test
sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error" + err))

// Body parser configuration
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue sur mon serveur</h1>');
});

server.use('/destinations', require('./routes/destinations'));

// Lauch server
server.listen(8080, function() {
    console.log('Serveur en écoute');
});