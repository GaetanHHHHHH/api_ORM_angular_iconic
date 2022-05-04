const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
//const dest = require('../models/Destination');

var models = require('../models'); // loads index.js
var dest = models.Destination;       // the model keyed by its name

router.get('/', (req, res) => 
    dest.findAll()
        .then(destinations => {
            console.log(destinations)
            res.sendStatus(200)
        })
        .catch(err => console.log(err)));

module.exports = router;
