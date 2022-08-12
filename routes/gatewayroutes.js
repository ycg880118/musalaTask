const express = require('express');
const router = express. Router();
const {Gateway,Peripheral} = require('../models/models');

//List all gateways
router.get('/' , async (_req, res) =>{    
    let r=await getGateways();
    res.status(r.status).json(r.data);    
});

//Get one gateway
router.get('/gateway:id' , async (req, res) =>{      
    let r=await getGateways(req.params.serialNumber);
    res.status(r.status).json(r.data);  
 });

async function getGateways(serialNumber=null){
    return (serialNumber===null?Gateway.find():Gateway.findOne(serialNumber)).populate("peripheralDevices")
    .then(gateways=>{
        return {status:200, data:gateways};
    })
    .catch(error=>{
        return {status:404, data:{error:error+""}};
    }); 
}

//Add gateway
router.post('/add', async (req, res) =>{
    const{serialNumber, name, ipv4Address} = req.body; 
    console.log(req.body);
    let validIp=validateIpv4Address(ipv4Address);
    let r;
    if(!validIp)
        r={status:'500',msg:'Invalid Ipv4 address'};
    else 
        r=await addGateway(serialNumber, name, ipv4Address);
    res.status(r.status).json(r.msg);
});
async function addGateway(serialNumber, name, ipv4Address){
    let gateway = new Gateway({serialNumber, name, ipv4Address});
    return gateway.save()
    .then(()=>{
        return {status:200,msg:"Gateway Add Success"};
    })
    .catch(error=>{
        return {status:500,msg:{error:error+""}};
    });
}
function validateIpv4Address(ip){
    //TODO
    return true;
}


//Delete gateway
//TODO
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