const gatewayDb = require('../db/gatewayDb');

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

exports.addGateway = async (serialNumber, name, ipv4Address)=>{
    try{
        if(!(/^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/.test(ipv4Address)))
            throw (new Error('ipv4Address is invalid'));        
        return await gatewayDb.addGateway(serialNumber, name, ipv4Address);
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