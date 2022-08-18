const peripheralService= require('../services/peripheralService');


exports.addPeripheral = async (req, res)=>{
    try{
        let gateway = await peripheralService.addPeripheralDevice(req.body);
        if(!gateway)
            res.status(404).json({'error' : 'There is no gateway with the given id'});
        else
            res.status(200).json({'result':gateway});
    }catch(error){
        res.status(500).json({'error' : error.toString()});
    }
}

exports.removePeripheral= async(req, res) =>{
    try{
        let gateway = await peripheralService.removePeripheralDevice(req.params);
        if(!gateway)
            res.status(404).json({'error' : 'There is no gateway with the given id'});
        else
            res.status(200).json({'result':gateway});
    }catch(error){
        res.status(500).json({'error' : error.toString()});
    }
}