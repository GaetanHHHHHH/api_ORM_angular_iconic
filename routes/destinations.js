const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
//const dest = require('../models/Destination');

var models = require('../models'); // loads index.js
var dest = models.Destination;       // the model keyed by its name

// Get destinations list
router.get('/', (req, res) => 
    dest.findAll()
        .then(destinations => {
            console.log(destinations)
            res.sendStatus(200)
        })
        .catch(err => console.log(err)));

// Add a destination
router.get('/add', (req, res) => {
    const data = {
        name: 'Looking for a holiday special',
        country: 'Belgium',
        description: 'Please I need a vacation'
    }

    let { name, country, description } = data;

    // Insert into table
    dest.create({
        name,
        country,
        description
    })
    .then(dest => res.redirect('/destinations'))
    .catch(err => console.logg(err));
});

module.exports = router;
