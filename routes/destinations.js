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
            res.render('destinations', {
                destinations
            })
        })
        .catch(err => console.log(err)));

// Display add destination form
router.get('/add', (req, res) => res.render('add'));

// Add a destination
router.post('/add', (req, res) => {
    const data = {
        name: 'Nice cottage at home',
        country: 'UK',
        description: 'Youll be fine'
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
