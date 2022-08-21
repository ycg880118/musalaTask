const gatewayService= require('../services/gatewayService');
const Joi= require('joi');

exports.getAllGateways = async (_req, res)=>{
    try{
        let gateways=await gatewayService.getGateways();        
        res.status(200).json({'result' : {msg:'ok', data:gateways}}); 
    }catch(error){
        res.status(500).json({'error' : error.toString()});
    }

}
exports.getGateway = async (req, res) =>{
    try{
        const {error} = validateId({_id:req.params._id});
        if(error){            
            throw (new Error('Validation error: '+error.details[0].message)); 
        }
        let gateway =await gatewayService.getGateway(req.params._id);
        if(!gateway)
            res.status(404).json({'error' : 'There is no gateway with the given id'});
        else
            res.status(200).json({'result' : {msg:'ok', data: gateway}}); 
    }catch(error){        
        res.status(500).json({'error' : error.toString()});
    }
}

exports.addGateway = async (req, res)=>{
    try{  
        const {error} = validateGateway(req.body);
        if(error)
            throw (new Error('Validation error: '+error.details[0].message));       
        let gateway = await gatewayService.addGateway(req.body);
        res.status(200).json({'result' :{msg : `Gateway ${req.body.serialNumber} added successfully`, data:gateway} }); 
    }catch(error){
        res.status(500).json({'error' : error.toString()});
    }
}

exports.removeGateway = async (req, res)=>{
    try{
        const {error} = validateId({_id:req.params._id});
        if(error){
            throw (new Error('Validation error: '+error.details[0].message)); 
        }
        let gateway = await gatewayService.removeGateway(req.params._id);
        if(!gateway)
            res.status(404).json({'error' : 'There is no gateway with the given id'});
        else
            res.status(200).json({'result' : {msg : `Gateway ${req.params._id} removed successfully`,data :gateway}});
    }catch(error){
        res.status(500).json({'error' : error.toString()});
    }
}

function validateGateway(gateway){
    
    const schema =Joi.object({        
        serialNumber : Joi.string().required(),
        name: Joi.string().required(),
        ipv4Address: Joi.string().ip({version:['ipv4']}).required()
    });

    return schema.validate(gateway);
}

if(process.env.NODE_DEV=='TEST'){
    exports.validateGateway=validateGateway;
    exports.validateId=validateId;
}
    

function validateId(id){
    const schema= Joi.object({
        _id:Joi.string().hex().length(24)
    });

    return schema.validate(id);
}





