const mongoose=require('mongoose');
const {Schema, model} = mongoose;
const PeripheralSchema = require('./peripheralModel').Peripheral.schema;
const Joi= require('joi');

const GatewaySchema = new Schema({
    serialNumber: {
        type: String,
        required: true,
        unique : true
    },
    name:{
        type: String,
        required: true
    },
    ipv4Address :{
        type: String,
        required: true
    },
    peripheralDevices :[PeripheralSchema]
});

const Gateway= model("Gateway", GatewaySchema);

function validateGateway(gateway){
    
    const schema =Joi.object({        
        serialNumber : Joi.string().required(),
        name: Joi.string().required(),
        ipv4Address: Joi.string().ip({version:['ipv4']}).required()
    });

    return schema.validate(gateway);
}

function validateId(id){
    const schema= Joi.object({
        _id:Joi.string().hex().length(24)
    });

    return schema.validate(id);
}
module.exports = {Gateway, validateGateway, validateId};
