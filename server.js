// Imports
var express = require('express');
var expresshbs = require('express-handlebars');
var bodyParser = require('body-parser');
const { sequelize } = require('./models');
const path = require('path');

// Instantiate server
var server = express();

// Handlebars
server.engine('handlebars', expresshbs.engine({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');

// Set static folder
server.use(express.static(path.join(__dirname, 'public')));

// Test
sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error" + err))

// Body parser configuration
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// Configure routes
    // Index route
server.get('/', (req, res) => res.render('index', { layout: 'landing' }));
    // All route
server.use('/destinations', require('./routes/destinations'));
server.use('/links', require('./routes/links'));
server.use('/agences', require('./routes/agences'));

// Lauch server
server.listen(8080, function() {
    console.log('Serveur en écoute');
});