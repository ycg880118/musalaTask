const express = require('express');
const router = express. Router();

const {Gateway,Peripheral} = require('../models/models').default

router.get('/' , async (req, res) =>{
   Gateway.find()
    .populate("peripherals")
   .then(gateway => {
      res.json(gateway); 
   });
});

router.get('/:id' , async (req, res) =>{
   Gateway.findOne({"_id": req.params.id}).populate("peripherals")
   .then(gateway => {
      res.json(gateway); 
   });
     
});

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