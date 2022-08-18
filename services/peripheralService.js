const db = require('../db/db');
const {validateId} =require('../models/gatewayModel');
const {validatePeripheral} = require('../models/peripheralModel');

exports.addPeripheralDevice = async (params)=>{
    try{        
        const peripheralValidationError = validatePeripheral(params.peripheral).error;
        if(peripheralValidationError)
            throw (new Error('Validation error: '+ peripheralValidationError.details[0].message));
        const gatewayIdValidationError = validateId({_id:params.gatewayId}).error;
        if(gatewayIdValidationError)
            throw (new Error('Validation error: '+ gatewayIdValidationError.details[0].message));
        return await db.addPeripheral(params.peripheral, params.gatewayId);
    }catch(error){
        throw (new Error('Peripheral service error: '+error.toString()));
    }
}

exports.removePeripheralDevice = async(params) =>{
    try{
        const peripheralIdValidationError= validateId({_id:params.peripheralId}).error;
        if(peripheralIdValidationError)
            throw (new Error('Validation error: '+ peripheralIdValidationError.details[0].message));
        const gatewayIdValidationError = validateId({_id:params.gatewayId}).error;
        if(gatewayIdValidationError)
            throw (new Error('Validation error: '+ gatewayIdValidationError.details[0].message));
        return await db.removePeripheral(params.gatewayId, params.peripheralId);
    }catch(error){
        throw (new Error('Peripheral service error: '+error.toString()));
    }
}