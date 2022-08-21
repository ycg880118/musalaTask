const gatewayService= require('../../services/gatewayService');
const db= require('../../db/db');
const {Gateway }= require('../../models/gatewayModel');

describe('getGateways' , () =>{

    it('Should return an array of gateways containing all gateways in the collection', async () =>{
        db.getAllGateways = () =>{  
                    
            return [{_id : '54759eb3c090d83494e2d804', serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'}];
        };
        let gateways=await gatewayService.getGateways();
        expect(gateways).toMatchObject([{_id : '54759eb3c090d83494e2d804', serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'}]);
    });

    it('Should throw an exception containing custom error if db module throws',async ()=>{
        db.getAllGateways = () =>{                     
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.getGateways()}).rejects.toThrow("Gateway service error");
    });

});

describe('getGateway' , () =>{

    it('Should return the gateway with the given id', async () =>{
        db.getGateway = (id) =>{                      
            return {_id : id, serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'};
        };
        let gateways=await gatewayService.getGateway('54759eb3c090d83494e2d804');
        expect(gateways).toMatchObject({_id : '54759eb3c090d83494e2d804', serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'});
    });
    it('Should return null if there is no gateway with the given id', async () =>{
        db.getGateway = (_id) =>{                      
            return null;
        };
        let gateways=await gatewayService.getGateway('54759eb3c090d83494e2d804');
        expect(gateways).toBe(null);
    });

    it('Should throw an exception containing custom error if db module throws',async ()=>{
        db.getGateway = (_id) =>{                       
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.getGateway('54759eb3c090d83494e2d804')}).rejects.toThrow("Gateway service error");
    });

});

describe('addGateway', ()=>{

    it('Should return the new gateway', async()=>{
        db.addGateway = (serialNumber, name, ipv4Address) =>{
            return new Gateway({ serialNumber, name, ipv4Address });
        };
        let gateway=await gatewayService.addGateway({serialNumber:'1',name:'name', ipv4Address:'192.168.1.20'});
        expect(gateway).toMatchObject({serialNumber:'1', name:'name', ipv4Address:'192.168.1.20'});
    });

    it('Should throw an exception containing custom error if db module throws',async ()=>{
        db.addGateway = (_serialNumber, _name, _ipv4Address) =>{                       
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.addGateway({serialNumber:'1',name:'name', ipv4Address:'192.168.1.20'})}).rejects.toThrow("Gateway service error");
    });


});

describe('removeGateway', ()=>{
    it('Should return null if there is no gateway with the given id', async ()=>{
        db.removeGateway = (_id)=>{
            return null;
        };
        let gateway=await gatewayService.removeGateway('54759eb3c090d83494e2d804');
        expect(gateway).toBe(null);
    });

    it('Should return the deleted gateway', async ()=>{
        db.removeGateway = (_id)=>{
            return {_id:_id, serialNumber:'3', name:'name', ipv4Address:'192.168.1.20'};
        };
        let gateway=await gatewayService.removeGateway('54759eb3c090d83494e2d804');
        expect(gateway).toMatchObject({_id:'54759eb3c090d83494e2d804', serialNumber:'3', name:'name', ipv4Address:'192.168.1.20'});
    });

    
    it('Should throw an exception containing custom error if db module throws',async ()=>{
        db.removeGateway = (_serialNumber, _name, _ipv4Address) =>{                       
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.removeGateway('54759eb3c090d83494e2d804')}).rejects.toThrow("Gateway service error");
    });
});

