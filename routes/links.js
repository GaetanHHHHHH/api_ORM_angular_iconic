const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
var DataTypes = require('sequelize/lib/data-types');
//const dest = require('../models/Destination');

var models = require('../models'); // loads index.js
var dest = models.Destination;       // the model keyed by its name
var link = sequelize.define('Agence_Destination', {destinationId: DataTypes.INTEGER, agenceId: DataTypes.INTEGER}, {freezeTableName: true}, { timestamps: false });


// GET a list of all links
router.get('/',(req, res) => {
    link.findAll()    
    .then(links => {
        const linkies = {
            context: links.map(data =>{
                return{
                    id: data.id,
                    destinationId: data.destinationId,
                    agenceId: data.agenceId
                }
            })
        }
        res.json({links: linkies.context});
        // res.render('links',{links: linkies.context})
    })
    .catch(err => res.status(500).json({message: err})) 
});


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
        console.log(destinationId, agenceId);
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


// Return a link with the id
router.get('/id=:linkId',(req,res)=>{
    linkId = req.params.linkId;
    // console.log(agenId)
    link.findByPk(linkId)
        .then( data => {
            const linkie = {
                context: {                    
                    // id: data.id,
                    destinationId: data.destinationId,
                    agenceId: data.agenceId
                }
            }
            res.json(linkie.context)
        })
        .catch(err => res.status(500).json({message: err}));
});


// delete link
router.delete('/id=:linkId',(req,res)=>{
    linkId = req.params.linkId;
    link.destroy({
        where: {id: linkId}
    }).then( data =>{
        res.json({message: "link deleted"});
    }).catch(err => {
        res.status(500).json({message: err.message})
    })

});



module.exports = router;