// Imports
var express = require('express');
var expresshbs = require('express-handlebars');
var bodyParser = require('body-parser');
const { sequelize } = require('./app/models');
const path = require('path');
const cors = require('cors');

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
//server.get('/', (req, res) => res.render('index', { layout: 'landing' }));
server.get("/", (req, res) => {
    res.redirect('/destinations')
  });
    // All routes
server.use('/destinations', require('./app/routes/destinations'));
server.use('/links', require('./app/routes/links'));
server.use('/agences', require('./app/routes/agences'));


// allow urls
const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8100',
  ];
  
  // Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };
  
  // Enable preflight requests for all routes
  server.options('*', cors(corsOptions));


// Lauch server
server.listen(8080, function() {
    console.log('Serveur en écoute');
});