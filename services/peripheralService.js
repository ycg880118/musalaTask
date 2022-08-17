const db = require('../db/db');
const {validateId} =require('../models/gatewayModel');
const {validatePeripheral} = require('../models/peripheralModel');

exports.addPeripheralDevice = async (params)=>{
    try{        
        const peripheralValidationError = validatePeripheral(params.peripheral).error;
        if(peripheralValidationError)
            throw (new Error('Validation error: '+ peripheralValidationError.details[0].message));
        const gatewayIdValidationError = validateId(params.gatewayId).error;
        if(gatewayIdValidationError)
            throw (new Error('Validation error: '+ gatewayIdValidationError.details[0].message));
        return await db.addPeripheral(params.peripheral, params.gatewayId);
    }catch(error){
        throw (new Error('Peripheral service error: '+error.toString()));
    }
}