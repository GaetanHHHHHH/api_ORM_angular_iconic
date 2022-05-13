const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
//const dest = require('../models/Destination');

var models = require('../models'); // loads index.js
var agence = models.Agence;       // the model keyed by its name
const link = sequelize.define('Agence_Destination', {}, {freezeTableName: true}, { timestamps: false });


// GET a list of all agencies
router.get('/',(req, res) => 
    agence.findAll()    
    .then(agencies => {
        const ags = {
            context: agencies.map(data =>{
                return{
                    // id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    localization: data.localization
                }
            })
        }
        res.json( ags.context);
        // res.render('agencies',{
        //     agencies: ags.context
        // })
    })
    .catch(err => res.status(500).json({message: err})) 
);


// GET an agency' informations with the id
router.get('/id=:agenId',(req,res)=>{
    agenId = req.params.agenId;
    // console.log(agenId)
    agence.findByPk(agenId)
        .then( data => {
            const ag = {
                context: {                    
                    // id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    localization: data.localization
                }
            }
            res.json(ag.context)
        })
        .catch(err => res.status(500).json({message: err}));
});


// delete agency
router.delete('/id=:agenId',(req,res)=>{
    agenId = req.params.agenId;
    // Delete all links
    link.destroy({
        where: {
            agenceId: agenId
        }
    }).then(
        // Delete destination
        agence.destroy({
            where: {id: agenId}
        }).then( data =>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "agence deleted"}));
        }).catch(err => {
            res.status(500).json({message: err.message})
        })
    ).catch(err => {
        res.status(500).json({message: err.message})
    })  
});


// Add a new agency
router.post('/add',(req, res) => {
    let {name, email, phone, localization} = req.body;
    let errors = [];
    // validate fields
    if(!name){errors.push({text: "no name"})};
    if(!email){errors.push({text: "no email"})};
    if(!phone){errors.push({text: "no phone"})};
    if(!localization){errors.push({text: "no localization"})};
    //check for errors
    if(errors.length != 0){
        res.render('add',{
            errors,
            name,
            email,
            phone,
            localization
        })
    } else {
        //insert into table
        agence.create({
            name,
            email,
            phone,
            localization
        })
            // .then(agencies => res.redirect('/agencies')) 
            .then(agence =>{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({message: "agence added"}));
            })
            .catch(err => res.status(500).json({message: err}))
        }   
    }  
);


// Search all agencies that are linked to a destination
router.get('/search/id=:destId',(req,res)=>{
    destId = req.params.destId;
    link.findAll({
            where: {
                destinationId: destId
            }
        }
    ).then(
        linkies => {
            const agenIds = linkies.map(data => {
                return data.agenceId
            })
            console.log(agenIds)
            agence.findAll({
                where: {
                    id: agenIds
                }
            }).then(
                agencies => {
                    const ags = {
                        context: agencies.map(data => {
                            return{
                                // id: data.id,
                                name: data.name,
                                email: data.email,
                                phone: data.phone,
                                localization: data.localization
                            }
                        })
                    }
                    res.json(ags.context);
                }
            )
            .catch(err => res.status(500).json({message: err})) 
        }
    )
})


// Post a form
router.post('/contact',(req,res)=>{
    let {destination_id, agency_id, name, email, phone} = req.body;
    let errors = [];
    // validate fields
    if(!destination_id){errors.push({text: "no dest id"})};
    if(!agency_id){errors.push({text: "no agen id"})};
    if(!name){errors.push({text: "no name"})};
    if(!email){errors.push({text: "no email"})};
    if(!phone){errors.push({text: "no phone"})};
    //check for errors
    if(errors.length != 0){
        res.json({
            errors,
            destination_id, 
            agency_id,
            name,
            email,
            phone
        })
    } else{
        //insert into table
        res.json({ message: "form sent",
            data: {
                destinationId, 
                agencyId,
                name,
                email,
                phone
        }
        })
    }   
})


module.exports = router;