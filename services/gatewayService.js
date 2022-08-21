const db = require('../db/db');
const {validateGateway, validateId} =require('../models/gatewayModel');


exports.getGateways = async () => {
    try {
        return await db.getAllGateways();
    } catch (error) {
        throw (new Error('Gateway service error: '+error.toString()));
    } 
}

exports.getGateway = async (id) => {
    try {        
        return await db.getGateway(id);               
    } catch (error) {        
        throw (new Error('Gateway service error: '+error.toString()));
    } 
}

exports.addGateway = async (params)=>{
    try{               
        return await db.addGateway(params.serialNumber, params.name, params.ipv4Address);
    }catch(error){
        throw (new Error('Gateway service error: '+error.toString()));
    }
}


exports.removeGateway = async (id)=>{
    try{        
        return await db.removeGateway(id);        
    }catch(error){
        throw (new Error('Gateway service error: '+error.toString()));
    }    
}

