const gatewayDb = require('../db/gatewayDb');
const {validateGateway, validateId} =require('../models/gatewayModel');
const {validatePeripheral} = require('../models/peripheralModel');

exports.getGateways = async () => {
    try {
        return await gatewayDb.getAllGateways();
    } catch (error) {
        throw (new Error('Gateway service error: '+error.toString()));
    } 
}

exports.getGateway = async (id) => {
    try {
        const {error} = validateId({_id:id});
        if(error){
            throw (new Error('Validation error: '+error.details[0].message)); 
        }
        return await gatewayDb.getGateway(id);               
    } catch (error) {
        throw (new Error('Gateway service error: '+error.toString()));
    } 
}

exports.addGateway = async (params)=>{
    try{
        const {error} = validateGateway(params);
        if(error)
            throw (new Error('Validation error: '+error.details[0].message));        
        return await gatewayDb.addGateway(params.serialNumber, params.name, params.ipv4Address);
    }catch(error){
        throw (new Error('Gateway service error: '+error.toString()));
    }
}


exports.removeGateway = async (id)=>{
    try{
        const {error} = validateId({_id:id});
        if(error){
            throw (new Error('Validation error: '+error.details[0].message)); 
        }
        return await gatewayDb.removeGateway(id);        
    }catch(error){
        throw (new Error('Gateway service error: '+error.toString()));
    }    
}

exports.addPeripheralDevice = async (params)=>{
    try{
        const {error} = validatePeripheral(params.peripheral)
        return await gatewayDb.addPeripheral(params.peripheral.uid, params.peripheral.vendor, params.peripheral.date, params.peripheral.status, params.gatewayId);
    }catch(error){
        throw (new Error('Gateway service error: '+error.toString()));
    }
}