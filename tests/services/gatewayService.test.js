const gatewayService= require('../../services/gatewayService');
const gatewayDb= require('../../db/gatewayDb');
const Gateway = require('../../models/gatewayModel');

describe('getGateways' , () =>{

    it('Should return an array of gateways containing all gateways in the db', async () =>{
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
        await expect(async ()=>{await gatewayService.getGateways()}).rejects.toThrow("Db module throws error");
    });

});

describe('getGateway' , () =>{

    it('Should return the gateway with the given id', async () =>{
        gatewayDb.getGateway = (id) =>{                      
            return {_id : id, serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'};
        };
        let gateways=await gatewayService.getGateway('1');
        expect(gateways).toMatchObject({_id : '1', serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'});
    });
    it('Should return null if there is no gateway with the given id', async () =>{
        gatewayDb.getGateway = (_id) =>{                      
            return null;
        };
        let gateways=await gatewayService.getGateway('1');
        expect(gateways).toBe(null);
    });

    it('Should throw an exception containing custom error if db module throws',async ()=>{
        gatewayDb.getGateway = (_id) =>{                       
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.getGateway('1')}).rejects.toThrow("Db module throws error");
    });

});

describe('addGateway', ()=>{

    it('Should throw if ipv4Address is invalid', async () =>{
        await expect(async () =>{await gatewayService.addGateway('1','name','0.1')}).rejects.toThrow('ipv4Address is invalid');
    });

    it('Should save and return the new gateway if ipv4Address is valid', async()=>{
        gatewayDb.addGateway = (serialNumber, name, ipv4Address) =>{
            return new Gateway({ serialNumber, name, ipv4Address });
        };

        let gateway=await gatewayService.addGateway('1', 'name', '192.168.1.20');
        expect(gateway).toMatchObject({serialNumber:'1', name:'name', ipv4Address:'192.168.1.20'});
    });

    it('Should throw an exception containing custom error if db module throws',async ()=>{
        gatewayDb.addGateway = (_serialNumber, _name, _ipv4Address) =>{                       
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.addGateway('1', 'name', '192.168.1.20')}).rejects.toThrow("Service throws error");
    });


});

describe('removeGateway', ()=>{
    it('Should return null if there is no gateway with the given id', async ()=>{
        gatewayDb.removeGateway = (_id)=>{
            return null;
        };
        let gateway=await gatewayService.removeGateway('1');
        expect(gateway).toBe(null);
    });

    it('Should delete and return the gateway with the given id', async ()=>{
        gatewayDb.removeGateway = (_id)=>{
            return {_id:_id,serialNumber:'3',name:'name',ipv4Address:'192.168.1.20'};
        };
        let gateway=await gatewayService.removeGateway('1');
        expect(gateway).toMatchObject({_id:'1',serialNumber:'3',name:'name',ipv4Address:'192.168.1.20'});
    });

    it('Should throw an exception containing custom error if db module throws',async ()=>{
        gatewayDb.removeGateway = (_serialNumber, _name, _ipv4Address) =>{                       
            throw(new Error('some exception'));
        };
        await expect(async ()=>{await gatewayService.removeGateway('1')}).rejects.toThrow("Db module throws error");
    });
});