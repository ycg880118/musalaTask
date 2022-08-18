const mongoose=require('mongoose');
const {Schema, model} = mongoose;
const Joi=require('joi').extend(require('@joi/date'));


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

const Peripheral= model("Peripheral", PeripheralSchema);

function validatePeripheral(peripheral){
    const schema= Joi.object({
        uid : Joi.number().required(),
        vendor : Joi.string().required(),
        date : Joi.date().format('YYYY-MM-DD').required(),
        status : Joi.string().required()
    });

    return schema.validate(peripheral);
}

module.exports = {Peripheral, validatePeripheral};