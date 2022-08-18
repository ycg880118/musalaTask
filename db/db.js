
const {Gateway} =require('../models/gatewayModel');
const {Peripheral}=require('../models/peripheralModel');

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

exports.addPeripheral = (peripheral, gatewayId) =>{
    return Gateway.findById({'_id':gatewayId}).then(gateway=>{ 
        if(!gateway)
            return null;      
        gateway.peripheralDevices.push(new Peripheral(peripheral));
        gateway.markModified('peripheralDevices');
        return gateway.save().then(g => g);
    });
}

exports.removePeripheral = (gatewayId,peripheralId) =>{
    let updateQuery={
        '$pull': {
            'peripheralDevices':{ '_id': peripheralId }
        }
    };
    return Gateway.findByIdAndUpdate(gatewayId,updateQuery).then(()=>{
        return Gateway.findById(gatewayId);
    });
}
