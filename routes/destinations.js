const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
//const dest = require('../models/Destination');

var models = require('../models'); // loads index.js
var dest = models.Destination;       // the model keyed by its name



// Get destinations list

// router.get('/', (req, res) => 
//     dest.findAll()
//         .then(destinations => {
//             res.render('destinations', {
//                 destinations
//             })
//         })
//         .catch(err => console.log(err)));

router.get('/', (req, res) =>
    dest.findAll()
        .then(destinations => {
            const dests = {
                context: destinations.map(data => {
                    return {
                        // id: data.id,
                        name: data.name,
                        description: data.description,
                        country: data.country
                    }
                })
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(dests.context));
            // res.render('destinations',{
            //     destinations: dests.context
            // });
            // res.json(dests.context)
        })
        .catch(err => res.status(500).json({ message: err }))

);


// Return a destination with the id
router.get('/id=:destId',(req,res)=>{
    destId = req.params.destId;

    //TODO: get the agencies with a request to /search/id=destId

    dest.findByPk(destId)
        .then( destination => {
            const dest = {
                context: {                    
                    // id: destination.id,
                    name: destination.name,
                    description: destination.description,
                    country: destination.country
                }
            }
            res.json(dest.context)
            // res.render('destinations',{
            //     destinations: [dest.context]
            // });
        })
        .catch(err => res.status(500).json({message: err}));
   
});



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
