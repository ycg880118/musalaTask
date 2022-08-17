const gatewayService= require('../../services/gatewayService');
const gatewayDb= require('../../db/gatewayDb');
const {Gateway }= require('../../models/gatewayModel');

describe('getGateways' , () =>{

    it('Should return an array of gateways containing all gateways in the collection', async () =>{
        gatewayDb.getAllGateways = () =>{  
                    
            return [{_id : '4', serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'}];
        };
        let gateways=await gatewayService.getGateways();
        expect(gateways).toMatchObject([{_id : '4', serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'}]);
    });

    it('Should throw an exception containing custom error if db module throws',async ()=>{
        gatewayDb.getAllGateways = () =>{                     
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.getGateways()}).rejects.toThrow("Gateway service error");
    });

});

describe('getGateway' , () =>{

    it('Should return the gateway with the given id', async () =>{
        gatewayDb.getGateway = (id) =>{                      
            return {_id : id, serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'};
        };
        let gateways=await gatewayService.getGateway('54759eb3c090d83494e2d804');
        expect(gateways).toMatchObject({_id : '54759eb3c090d83494e2d804', serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'});
    });
    it('Should return null if there is no gateway with the given id', async () =>{
        gatewayDb.getGateway = (_id) =>{                      
            return null;
        };
        let gateways=await gatewayService.getGateway('54759eb3c090d83494e2d804');
        expect(gateways).toBe(null);
    });

    it('Should throw an exception if _id is not valid id',async ()=>{        
        await expect(async ()=>{await gatewayService.removeGateway('1')}).rejects.toThrow("Validation error");
    });

    it('Should throw an exception containing custom error if db module throws',async ()=>{
        gatewayDb.getGateway = (_id) =>{                       
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.getGateway('54759eb3c090d83494e2d804')}).rejects.toThrow("Gateway service error");
    });

});

describe('addGateway', ()=>{

    it('Should throw if ipv4Address is invalid', async () =>{
        await expect(async () =>{await gatewayService.addGateway({serialNumber:'1',name:'name', ipv4Address:'0.1'})}).rejects.toThrow('ipv4Address');
    });

    it('Should throw if serialNumber is empty', async () =>{
        await expect(async () =>{await gatewayService.addGateway({serialNumber:'',name:'name', ipv4Address:'0.1'})}).rejects.toThrow('serialNumber');
    });

    it('Should throw if name is empty', async () =>{
        await expect(async () =>{await gatewayService.addGateway({serialNumber:'1',name:'', ipv4Address:'0.1'})}).rejects.toThrow('name');
    });

    it('Should return the new gateway if parameters are valid', async()=>{
        gatewayDb.addGateway = (serialNumber, name, ipv4Address) =>{
            return new Gateway({ serialNumber, name, ipv4Address });
        };
        let gateway=await gatewayService.addGateway({serialNumber:'1',name:'name', ipv4Address:'192.168.1.20'});
        expect(gateway).toMatchObject({serialNumber:'1', name:'name', ipv4Address:'192.168.1.20'});
    });

    it('Should throw an exception containing custom error if db module throws',async ()=>{
        gatewayDb.addGateway = (_serialNumber, _name, _ipv4Address) =>{                       
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.addGateway({serialNumber:'1',name:'name', ipv4Address:'192.168.1.20'})}).rejects.toThrow("Gateway service error");
    });


});

describe('removeGateway', ()=>{
    it('Should return null if there is no gateway with the given id', async ()=>{
        gatewayDb.removeGateway = (_id)=>{
            return null;
        };
        let gateway=await gatewayService.removeGateway('54759eb3c090d83494e2d804');
        expect(gateway).toBe(null);
    });

    it('Should  return the deleted gateway with the given id', async ()=>{
        gatewayDb.removeGateway = (_id)=>{
            return {_id:_id, serialNumber:'3', name:'name', ipv4Address:'192.168.1.20'};
        };
        let gateway=await gatewayService.removeGateway('54759eb3c090d83494e2d804');
        expect(gateway).toMatchObject({_id:'54759eb3c090d83494e2d804', serialNumber:'3', name:'name', ipv4Address:'192.168.1.20'});
    });

    it('Should throw an exception if _id is not valid id',async ()=>{        
        await expect(async ()=>{await gatewayService.removeGateway('1')}).rejects.toThrow("Validation error");
    });

    it('Should throw an exception containing custom error if db module throws',async ()=>{
        gatewayDb.removeGateway = (_serialNumber, _name, _ipv4Address) =>{                       
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.removeGateway('54759eb3c090d83494e2d804')}).rejects.toThrow("Gateway service error");
    });
});

