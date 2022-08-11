import mongoose, { Schema as _Schema, model } from "mongoose";
const {Schema} = mongoose;

const GatewaySchema = new Schema({
    serialNumber: {
        type: String,
        required: true
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
        type: _Schema.Types.ObjectId,
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

export default{Gateway, Peripheral };