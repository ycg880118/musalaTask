const peripheralService= require('../services/peripheralService');
const Joi=require('joi').extend(require('@joi/date'));

exports.addPeripheral = async (req, res)=>{
    try{
        const peripheralValidationError = validatePeripheral(req.body.peripheral).error;
        if(peripheralValidationError)
            throw (new Error('Validation error: '+ peripheralValidationError.details[0].message));
        const gatewayIdValidationError = validateId({_id:req.body.gatewayId}).error;
        if(gatewayIdValidationError)
            throw (new Error('Validation error: '+ gatewayIdValidationError.details[0].message));

        let gateway = await peripheralService.addPeripheralDevice(req.body);
        if(!gateway)
            res.status(404).json({'error' : 'There is no gateway with the given id'});
        else
            res.status(200).json({'result':{msg:`Peripheral ${req.body.peripheral.uid} added successfully`, data:gateway}});
    }catch(error){
        res.status(500).json({'error' : error.toString()});
    }
}

exports.removePeripheral= async(req, res) =>{
    try{
        const peripheralIdValidationError= validateId({_id:req.params.peripheralId}).error;
        if(peripheralIdValidationError)
            throw (new Error('Validation error: '+ peripheralIdValidationError.details[0].message));
        const gatewayIdValidationError = validateId({_id:req.params.gatewayId}).error;
        if(gatewayIdValidationError)
            throw (new Error('Validation error: '+ gatewayIdValidationError.details[0].message));
        let gateway = await peripheralService.removePeripheralDevice(req.params);
        if(!gateway)
            res.status(404).json({'error' : 'There is no gateway with the given id'});
        else
            res.status(200).json({'result':{msg:`Peripheral ${req.params.peripheralId} removed successfully`, data: gateway}});
    }catch(error){
        res.status(500).json({'error' : error.toString()});
    }
}

function validatePeripheral(peripheral){
    const schema= Joi.object({
        uid : Joi.number().required(),
        vendor : Joi.string().required(),
        date : Joi.date().iso().required(),
        status : Joi.string().valid("Online", "Offline").required()
    });

    return schema.validate(peripheral);
}

function validateId(id){
    const schema= Joi.object({
        _id:Joi.string().hex().length(24)
    });

    return schema.validate(id);
}