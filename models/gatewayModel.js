const mongoose=require('mongoose');
const {Schema, model} = mongoose;
const PeripheralSchema = require('./peripheralModel').schema;

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
module.exports = Gateway;