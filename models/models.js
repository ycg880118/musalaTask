
const mongoose=require('mongoose');
const {Schema, model} = mongoose;

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
    peripheralDevices :[{
        type: Schema.Types.ObjectId,
        ref: "Peripheral"
       
    }]
});

const PeripheralSchema = new Schema({    
    uid: {
        type: Number,
        required: true
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

const Gateway= model("Gateway", GatewaySchema);
const Peripheral= model("Peripheral", PeripheralSchema);

module.exports ={Gateway, Peripheral };