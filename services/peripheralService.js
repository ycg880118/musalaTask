const db = require('../db/db');

exports.addPeripheralDevice = async (params)=>{
    try{ 
        const gatewayPeripheralsCount = await db.getgatewayPeripheralsCount(params.gatewayId);
        if(gatewayPeripheralsCount >= 10)
            throw (new Error('Validation error: Only 10 peripheral devices allowed for a gateway'));
        return await db.addPeripheral(params.peripheral, params.gatewayId);
    }catch(error){
        throw (new Error('Peripheral service error: '+error.toString()));
    }
}

exports.removePeripheralDevice = async(params) =>{
    try{        
        return await db.removePeripheral(params.gatewayId, params.peripheralId);
    }catch(error){
        throw (new Error('Peripheral service error: '+error.toString()));
    }
}