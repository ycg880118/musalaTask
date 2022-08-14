
const mongoose=require('mongoose');
const {Schema, model} = mongoose;

const PeripheralSchema = new Schema({    
    uid: {
        type: Number,
        required: true,
        unique : true
    },
    vendor:{
        type: String,
        required: true
    },
    date :{
        type: Date,
        required: true
    },
    status :{
        type: String,
        required: true
    }
});

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
const Peripheral= model("Peripheral", PeripheralSchema);

module.exports ={Gateway, Peripheral};