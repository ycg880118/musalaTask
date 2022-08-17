const gatewayService= require('../services/gatewayService');

exports.getAllGateways = async (_req, res)=>{
    try{
        let gateways=await gatewayService.getGateways();        
        res.status(200).json({'result' : gateways}); 
    }catch(error){
        res.status(500).json({'error' : error});
    }

}
exports.getGateway = async (req, res) =>{
    try{
        let gateway =await gatewayService.addGateway(req.params._id);
        if(!gateway)
            res.status(404).json({'error' : 'There is no gateway with the given id'});
        res.status(200).json({'result' : gateway}); 
    }catch(error){
        res.status(500).json({'error' : error});
    }
}

exports.addGateway = async (req, res)=>{
    try{
        const {serialNumber, name, ipv4Address} = req.body;
        await gatewayService.addGateway(serialNumber, name, ipv4Address);
        res.status(200).json({'result' : `Gateway ${serialNumber} added successfully`}); 
    }catch(error){
        res.status(500).json({'error' : error});
    }
}

exports.removeGateway = async (req, res)=>{
    try{
        let gateway = await gatewayService.removeGateway(req.params._id);
        if(!gateway)
            res.status(404).json({'error' : 'There is no gateway with the given id'});
        res.status(200).json({'result' : `Gateway ${req.params._id} removed successfully`});
    }catch(error){
        res.status(500).json({'error' : error});
    }
}



