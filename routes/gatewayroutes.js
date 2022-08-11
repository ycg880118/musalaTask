const express = require('express');
const router = express. Router();
const {Gateway,Peripheral} = require('../models/models');

//List all gateways
router.get('/' , async (req, res) =>{    
    let gatewayList=await getAllGateways();
    res.status(200).json(gatewayList);    
});
async function getAllGateways(){
    return Gateway.find().populate("peripherals");     
}

//Get one gateway
router.get('/:id' , async (req, res) =>{      
   let r=await getGateway(req.params.id);
   res.status(r.resp).json(r.data);  
});
async function getGateway(id){
    return Gateway.findOne({"_id": req.params.id}).populate("peripherals")
    .then(gateway=>{
        return {resp:200, data:gateway};
    })
    .catch(error=>{
        return {resp:401, data:error};
    });
}


router.post('/', async (req, res) =>{
    const{serialNumber, humanReadableName, ipv4Address} = req.body;
    const gateway = new Gateway({serialNumber, humanReadableName, ipv4Address});
    await gateway.save();

    res.json({status:'Gateway Saved'});
});
 
router.put('/:id', async (req, res) =>{

    const{serialNumber, humanReadableName, ipv4Address} = req.body;
    const newGateway = {serialNumber, humanReadableName, ipv4Address};
    await Gateway.findOneAndUpdate({"_id": req.params.id}, newGateway);
    res.json({status:'Gateway Updated'});
});

router.delete('/:id', async (req, res) =>{
    Gateway.findOne({"_id": req.params.id}).then(gateway => {
        gateway.peripheralDevices.forEach(peripheral => {
            Peripheral.findOneAndRemove({"_id":peripheral}).exec(function (err) {
                if (err) 
                console.log(err);
              });
            
        }); 
     });
    await Gateway.findOneAndRemove({"_id": req.params.id});
    res.json({status:'Gateway Deleted'});
});


module.exports = router;