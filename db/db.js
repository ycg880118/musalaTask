const connect = require("mongoose").connect;
const {Gateway,Peripheral} = require('../models/models');

exports.connectToDB =(url)=>{
    connect(url).then(()=> console.log('DB is connected')).catch(err => console.error(err));
}

exports.getAllGateways = () =>{
    return Gateway.find();
}

exports.getGateway = (_id)=>{
    return Gateway.findById(_id);
}

exports.addGateway = (serialNumber, name, ipv4Address) =>{
    return new Gateway({serialNumber, name, ipv4Address}).save();
}

exports.removeGateway = (_id) =>{
    return Gateway.findByIdAndRemove(_id);
}

exports.addPeripheral = (uid, vendor, date, status, gatewayId) =>{
    return Gateway.findOne({'_id':gatewayId}).then(gateway=>{        
        gateway.peripheralDevices.push(new Peripheral({uid, vendor, date, status}));
        gateway.markModified('peripheralDevices');
        return gateway.save()
    });
}

exports.removePeripheral = (gatewayId,peripheralId) =>{
    let updateQuery={
        '$pull': {
            'peripheralDevices':{ '_id': peripheralId }
        }
    };
    return Gateway.findByIdAndUpdate(gatewayId,updateQuery);
}

