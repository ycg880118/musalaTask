const peripheralService= require('../../services/peripheralService');
const db= require('../../db/db');
const {Peripheral }= require('../../models/peripheralModel');

describe('addPeripheralDevice', ()=>{

    it('Should throw an exception if gatewayId is not valid id',async ()=>{          
        const payload={gatewayId:'1',peripheral:{uid:1,vendor:'qwe',date:'2019-03-13',status:'online'}};
        await expect(async ()=>{await peripheralService.addPeripheralDevice(payload)}).rejects.toThrow(/^.*?\bValidation error\b.*?\b_id\b/);
    });

    it('Should throw an exception if uid is not valid',async ()=>{          
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:'a',vendor:'qwe',date:'2019-03-13',status:'online'}};
        await expect(async ()=>{await peripheralService.addPeripheralDevice(payload)}).rejects.toThrow(/^.*?\bValidation error\b.*?\buid\b/);
    });

    it('Should throw an exception if vendor is empty',async ()=>{          
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'',date:'2019-03-13',status:'online'}};
        await expect(async ()=>{await peripheralService.addPeripheralDevice(payload)}).rejects.toThrow(/^.*?\bValidation error\b.*?\bvendor\b/);
    });

    it('Should throw an exception if date not valid',async ()=>{          
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'asd',date:'2019',status:'online'}};
        await expect(async ()=>{await peripheralService.addPeripheralDevice(payload)}).rejects.toThrow(/^.*?\bValidation error\b.*?\bdate\b/);
    });

    it('Should throw an exception if vendor is empty',async ()=>{          
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'asd',date:'2019-03-13',status:''}};
        await expect(async ()=>{await peripheralService.addPeripheralDevice(payload)}).rejects.toThrow(/^.*?\bValidation error\b.*?\bstatus\b/);
    });

    it('Should return null if there is no gateway with the given id', async ()=>{
        db.addPeripheral = async (_peripheral,_gatewayId)=>{
            return null;
        }
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'asd',date:'2019-03-13',status:'offline'}};
        const gateway = await peripheralService.addPeripheralDevice(payload);
        expect(gateway).toBe(null);

    });

    it('Should return the gateway where the peripheral was added if parameters are ok', async ()=>{
        db.addPeripheral = async(_peripheral,_gatewayId)=>{
            return {_id:_gatewayId, serialNumber:'SD342', name:'name',ipv4Address:'192.168.1.20',peripheralDevices:[{uid:1,vendor:'asd',date:'2019-03-13',status:'offline'}]};
        }
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'asd',date:'2019-03-13',status:'offline'}};
        const gateway = await peripheralService.addPeripheralDevice(payload);
        expect(gateway).toMatchObject({_id:payload.gatewayId,peripheralDevices:[{uid:1}]});

    });

    it('Should throw a custom exception if db module throws', async ()=>{
        db.addPeripheral = async(_peripheral,_gatewayId)=>{
            throw (new Error('some error'));
        }
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'asd',date:'2019-03-13',status:'offline'}};
        await expect(async ()=>{await peripheralService.addPeripheralDevice(payload)}).rejects.toThrow('Peripheral service error');
    });
});


describe('removePeripheralDevice', () =>{
    it('Should throw an exception if gatewayId is not valid id',async ()=>{          
        const pyload={gatewayId:'1',peripheralId:'54759eb3c090d83494e2d804'};
        await expect(async ()=>{await peripheralService.removePeripheralDevice(pyload)}).rejects.toThrow(/^.*?\bValidation error\b.*?\b_id\b/);
    });

    it('Should throw an exception if peripheralId is not valid id',async ()=>{          
        const pyload={gatewayId:'54759eb3c090d83494e2d804',peripheralId:'1'};
        await expect(async ()=>{await peripheralService.removePeripheralDevice(pyload)}).rejects.toThrow(/^.*?\bValidation error\b.*?\b_id\b/);
    });

    it('Should return null if there is no gateway with the given id', async ()=>{
        db.removePeripheral = async(_gatewayId, _peripheralId)=>{
            return null;
        }
        const pyload={gatewayId:'54759eb3c090d83494e2d804',peripheralId:'23759ec3c090d88494e2d805'};
        const gateway = await peripheralService.removePeripheralDevice(pyload);
        expect(gateway).toBe(null);
    });

    it('Should throw a custom exception if db module throws', async ()=>{
        db.removePeripheral = async(_gatewayId, _peripheralId)=>{
            throw (new Error('some error'));
        }
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheralId:'23759ec3c090d88494e2d805'};
        await expect(async ()=>{await peripheralService.removePeripheralDevice(payload)}).rejects.toThrow('Peripheral service error');
    });

    it('Should return the gateway where the peripheral was removed if parameters are ok', async ()=>{
        db.removePeripheral = async(_gatewayId, _peripheralId)=>{
            return {_id:_gatewayId, serialNumber:'SD342', name:'name',ipv4Address:'192.168.1.20',peripheralDevices:[]};
        }
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheralId:'23759ec3c090d88494e2d805'};
        const gateway = await peripheralService.removePeripheralDevice(payload);
        expect(gateway).toMatchObject({_id:payload.gatewayId,peripheralDevices:[]});

    });
});