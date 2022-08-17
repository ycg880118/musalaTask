const gatewayDb = require('../db/gatewayDb');
const {validateGateway} =require('../models/gatewayModel');

exports.getGateways = async () => {
    try {
        return await gatewayDb.getAllGateways();
    } catch (error) {
        throw (new Error('Db module throws error: '+error.toString()));
    } 
}

exports.getGateway = async (_id) => {
    try {
        return await gatewayDb.getGateway(_id);               
    } catch (error) {
        throw (new Error('Db module throws error: '+error.toString()));
    } 
}

exports.addGateway = async (params)=>{
    try{
        const {error} = validateGateway(params);
        if(error)
            throw (new Error(error.details[0].message));        
        return await gatewayDb.addGateway(params.serialNumber, params.name, params.ipv4Address);
    }catch(error){
        throw (new Error('Service throws error: '+error.toString()));
    }
}


exports.removeGateway = async (_id)=>{
    try{
        return await gatewayDb.removeGateway(_id);        
    }catch(error){
        throw (new Error('Db module throws error: '+error.toString()));
    }    
}

exports.addPeripheralDevice = async (uid, vendor, date, status, gatewayId)=>{
    try{
        return await gatewayDb.addPeripheral(uid, vendor, date, status, gatewayId);
    }catch(error){
        throw (new Error('Db module throws error: '+error.toString()));
    }
}