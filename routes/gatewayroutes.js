const express = require('express');
const router = express. Router();
const {Gateway,Peripheral} = require('../models/models');

//List all gateways
router.get('/' , (_req, res) =>{    
    getGateways().then(r=>{
        res.status(r.status).json(r.data); 
    });
       
});

//Get one gateway
router.get('/gateway/:serialNumber' , (req, res) =>{      
    getGateways(req.params.serialNumber).then(r=>{
        res.status(r.status).json(r.data);        
    });
    
 });

function getGateways(serialNumber=null){
    return (serialNumber===null?Gateway.find():Gateway.findOne({"serialNumber":serialNumber}))
    .then(gat=>{
        return {status:200, data: {'result':gat===null?{}:gat}};
    })
    .catch(error=>{
        return {status:500, data:{"error":error.toString()}};
    }); 
}

//Add gateway
router.post('/add', async (req, res) =>{
    const {serialNumber, name, ipv4Address} = req.body;     
    let r;
    if(!validateIpv4Address(ipv4Address))
        r={status:500,msg:{'error':'Invalid Ipv4 address'}};
    else 
        r=await addGateway(serialNumber, name, ipv4Address);
    res.status(r.status).json(r.msg);
});

function addGateway(serialNumber, name, ipv4Address){
    return new Gateway({serialNumber, name, ipv4Address}).save()
    .then(()=>{
        return {status:200,msg:{'result':`Gateway ${serialNumber} added successfully`}};
    })
    .catch(error=>{
        return {status:500,msg:{'error':error.toString()}};
    });
}

function validateIpv4Address(ipv4){    
    return /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/.test(ipv4);
}


//Delete gateway
router.delete('/remove/:serialNumber', async (req, res) =>{
    deleteGateway(req.params.serialNumber).then(r=>{
        res.status(r.status).json(r.msg);        
    });
});

function deleteGateway(serialNumber){      
    return Gateway.findOneAndRemove({"serialNumber": serialNumber})
        .then(()=>{  
            return {status:200,msg:{'result':'Gateway removed'}};})
        .catch(err=>{
            return {status:500,msg:{'error':err.toString()}};
        });   
}

//Add Peripheral
router.post('/peripheral/add', (req, res) =>{
    const {uid, vendor, date, status, gatewayId} = req.body;     
    addPeripheral(uid, vendor, date, status, gatewayId).then(r=>{
        res.status(r.status).json(r.msg);
    })
    
});

function addPeripheral(uid, vendor, date, status, gatewayId){
    
    return Gateway.findOne({'serialNumber':gatewayId}).then(gateway=>{
    
        if(gateway===null)
            return {status:500,msg:{'error':'gateway not found'}};
        if(gateway.peripheralDevices.length>=10)
            return {status:500,msg:{'error':'Only 10 peripheral devices allowed for a gateway'}};
    
        let p=new Peripheral({uid, vendor, date, status});
        gateway.peripheralDevices.push(p);
        gateway.markModified('peripheralDevices');
        return gateway.save().then(()=>{
            return {status:200,msg:{'result':`Peripheral ${uid} added successfully`}};
        }).catch(err=>{
            return {status:500,msg:{'error':err.toString()}};
        });       
            
    })

}

//Add Peripheral
router.delete('/peripheral/remove/:gatewayId/:peripheralId', (req, res) =>{      
    removePeripheral(req.params.gatewayId, req.params.peripheralId).then(r=>{
        res.status(r.status).json(r.msg);
    });    
});

function removePeripheral(gatewayId, peripheralId){
    let updateQuery={
        '$pull': {
            'peripheralDevices':{ '_id': peripheralId }
        }
    };
    return Gateway.findByIdAndUpdate(gatewayId,updateQuery)
    .then(()=>{             
        return {status:200,msg:{'result':`Peripheral ${peripheralId} removed`}}
     })
     .catch(err=>{
         return {status:500,msg:{'error':err.toString()}};
     });    
}

module.exports = router;