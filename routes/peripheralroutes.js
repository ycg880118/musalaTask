const express = require('express');
const router = express.Router();

const {Gateway,Peripheral} = require('../models/models')


router.get('/' , async (req, res) =>{
    const peripheral= await Peripheral.find();
    res.json(peripheral); 
});

router.get('/:id' , async (req, res) =>{
    const peripheral= await Peripheral.findOne({"_id": req.params.id});
    res.json(peripheral); 
});

router.post('/', async (req, res) =>{
    const{gateway, uid, vendor, date, status} = req.body;
    const peripheral = new Peripheral({gateway,uid, vendor, date, status});
     await peripheral.save();
     Gateway.findOne({"_id":gateway}).then(gateway => {
       gateway.peripheralDevices.push(peripheral._id);
       gateway.save();
     });

    res.json({status:'Peripheral Saved'});
});
 
router.put('/:id', async (req, res) =>{

    const{uid, vendor, date, status} = req.body;
    const newPeripheral = {uid, vendor, date, status};
    await Peripheral.findOneAndUpdate({"_id": req.params.id}, newPeripheral);
    res.json({status:'Peripheral Updated'});
});

router.delete('/:id', async (req, res) =>{
    await Peripheral.findOneAndRemove({"_id": req.params.id});
    res.json({status:'Peripheral Deleted'});
});

module.exports = router;