const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
//const dest = require('../models/Destination');

var models = require('../models'); // loads index.js
var dest = models.Destination;       // the model keyed by its name
const link = sequelize.define('Agence_Destination', {}, {freezeTableName: true}, { timestamps: false });


// Add a new link
router.post('/add',(req, res) => {

    let {destinationId, agenceId} = req.body;
    let errors = [];

    // validate fields
    if(!destinationId){errors.push({text: "no dest id"})};
    if(!agenceId){errors.push({text: "no agen id"})};

    //check for errors
    if(errors.length != 0){
        res.json({
            errors,
            destinationId, 
            agenceId
        })
    } else{
        //insert into table
        link.create({
            destinationId, 
            agenceId
        })
            // .then(linkes => res.redirect('/links'))
            .then(res.json({message: "link added"})) 
            .catch(err => console.log(err))
        }   
    }
    
    
);

module.exports = router;