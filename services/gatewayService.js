const db = require('../db/db');
const {validateGateway, validateId} =require('../models/gatewayModel');
const {validatePeripheral} = require('../models/peripheralModel');

exports.getGateways = async () => {
    try {
        return await db.getAllGateways();
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
        return await db.getGateway(id);               
    } catch (error) {        
        throw (new Error('Gateway service error: '+error.toString()));
    } 
}

exports.addGateway = async (params)=>{
    try{
        const {error} = validateGateway(params);
        if(error)
            throw (new Error('Validation error: '+error.details[0].message));        
        return await db.addGateway(params.serialNumber, params.name, params.ipv4Address);
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
        return await db.removeGateway(id);        
    }catch(error){
        throw (new Error('Gateway service error: '+error.toString()));
    }    
}

