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

const Peripheral= model("Peripheral", PeripheralSchema);
module.exports = Peripheral;