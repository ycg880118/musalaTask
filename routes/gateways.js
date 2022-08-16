const express = require('express');
const router = express.Router();
const server= require('../controler/server');

//List all gateways
router.get('/' , (_req, res) =>{    
   server.getGateways()
   .then(r=>{
        res.status(r.status).json(r.data); 
    });       
});

//Get one gateway
router.get('/gateway/:_id' , (req, res) =>{      
    server.getGateways(req.params._id)
    .then(r=>{
         res.status(r.status).json(r.data); 
     });     
 });

 //Add Gateway
 router.post('/add', async (req, res) =>{
    const {serialNumber, name, ipv4Address} = req.body;
    let r=await server.addGateway(serialNumber, name, ipv4Address);
    res.status(r.status).json(r.msg);
});


//Delete gateway
router.delete('/remove/:_id', async (req, res) =>{
    let r=await server.removeGateway(req.params._id);
    res.status(r.status).json(r.msg);     
});


module.exports = router;