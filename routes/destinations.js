const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
//const dest = require('../models/Destination');

var models = require('../models'); // loads index.js
var dest = models.Destination;       // the model keyed by its name
const link = sequelize.define('Agence_Destination', {}, {freezeTableName: true}, { timestamps: false });


// router.get('/', (req, res) => 
//     dest.findAll()
//         .then(destinations => {
//             res.render('destinations', {
//                 destinations
//             })
//         })
//         .catch(err => console.log(err)));


// Get destinations list
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


// Get a destination's infos with the id
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


// delete destination
router.delete('/id=:destId',(req,res)=>{
    destId = req.params.destId;
    // Delete all links
    link.destroy({
        where: {
            destinationId: destId
        }
    }).then(
        // Delete destination
        dest.destroy({
            where: {id: destId}
        }).then( data =>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "destination deleted"}));
        }).catch(err => {
            res.status(500)
        })
    ).catch(err => {
        res.status(500).json({message: err.message})
    })  
});


// Add a new destination
router.post('/add',(req, res) => {
    let {name, description, country} = req.body;
    console.log(req.body);
    let errors = [];
    // validate fields
    if(!name){errors.push({text: "no name"})};
    if(!description){errors.push({text: "no description"})};
    if(!country){errors.push({text: "no country"})};
    //check for errors
    if(errors.length != 0){
        res.render('add',{
            errors,
            name,
            description,
            country
        })
    } else{
        //insert into table
        dest.create({
            name,
            description,
            country
        })
            // .then(destinations => res.redirect('/destinations')) 
            // .then(res.json({message: "destination added"}))
            .then(dest =>{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({message: "destination added"}));
            })
            .catch(err => res.status(500).json({message: err})) 
        }   
    }
);


// modify a destination
router.put('/id=:destId',(req,res)=>{
    destId = req.params.destId;
    try {
        var obj = JSON.parse(req.body.data).value;
    } catch {
        var obj = req.body;
    }
    console.log(obj)
    let {name, description, country} = obj;
    console.log(req.body);
    // update in the table
    dest.update({
        name,
        description,
        country,
        },
        {where: {id: destId}}
    )
        .then(dest =>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "destination modified"}));
        })
        .catch(err => res.status(500).json({message: err})) 
    }   
);


module.exports = router;
