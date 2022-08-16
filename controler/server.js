const db = require('../db/db');
db.connectToDB(process.env.DATABASE_URL);

exports.getGateways = async (_id=null) => {
    try {
        let g = await (_id === null ? db.getAllGateways() : db.getGateway(_id));    
        return {status:200, data: {'result':g===null?{}:g}};   
    } catch (error) {
        return { status: 500, data: { "error": error.toString() } };
    } 
}

exports.addGateway = async (serialNumber, name, ipv4Address)=>{
    try{
        if(!validateIpv4Address(ipv4Address))
            return {status:500,msg:{'error':'Invalid Ipv4 address'}};
        
        await db.addGateway(serialNumber, name, ipv4Address);
        return {status:200,msg:{'result':`Gateway ${serialNumber} added successfully`}};
    
    }catch(error){
        return {status:500,msg:{'error':error.toString()}};
    }
}

function validateIpv4Address(ipv4){    
    return /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/.test(ipv4);
}

exports.removeGateway = async (_id)=>{
    try{
        let g=await db.removeGateway(_id);
        if(g!==null)
            return {status:200,msg:{'result':`Gateway ${_id} removed`}};
        return {status:200,msg:{'result':`There is no Gateway with id = ${_id}`}};
    }catch(error){
        return {status:500,msg:{'error':error.toString()}};
    }    
}

