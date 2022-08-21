const peripheralService= require('../../services/peripheralService');
const db= require('../../db/db');


describe('addPeripheralDevice', ()=>{


    it('Should throw an exception if there are already 10 peripherals in the gateway with the given id',async ()=>{    
        db.getgatewayPeripheralsCount =async (_gatewayId) =>{
            return 10;
        }
        
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'asd',date:'2022-08-21T16:09:13.170Z',status:'Online'}};
        await expect(async ()=>{await peripheralService.addPeripheralDevice(payload)}).rejects.toThrow('Validation error: Only 10 peripheral devices allowed for a gateway');
    });

    it('Should return null if there is no gateway with the given id', async ()=>{
        db.getgatewayPeripheralsCount = async (_gatewayId) =>{
            return 0;
        }
        db.addPeripheral = async (_peripheral,_gatewayId)=>{
            return null;
        }
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'asd',date:'2022-08-21T16:09:13.170Z',status:'Offline'}};
        const gateway = await peripheralService.addPeripheralDevice(payload);
        expect(gateway).toBe(null);

    });

    it('Should return the gateway where the peripheral was added', async ()=>{
        db.getgatewayPeripheralsCount = async (_gatewayId) =>{
            return 0;
        }
        db.addPeripheral = async(_peripheral,_gatewayId)=>{
            return {_id:_gatewayId, serialNumber:'SD342', name:'name',ipv4Address:'192.168.1.20',peripheralDevices:[{uid:1,vendor:'asd',date:'2022-08-21T16:09:13.170Z',status:'Offline'}]};
        }
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'asd',date:'2022-08-21T16:09:13.170Z',status:'Offline'}};
        const gateway = await peripheralService.addPeripheralDevice(payload);
        expect(gateway).toMatchObject({_id:payload.gatewayId,peripheralDevices:[{uid:1}]});

    });

    it('Should throw a custom exception if db module throws', async ()=>{
        db.getgatewayPeripheralsCount = async (_gatewayId) =>{
            return 0;
        }
        db.addPeripheral = async(_peripheral,_gatewayId)=>{
            throw (new Error('some error'));
        }
        const payload={gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'asd',date:'2019-03-13',status:'offline'}};
        await expect(async ()=>{await peripheralService.addPeripheralDevice(payload)}).rejects.toThrow('Peripheral service error');
    });
});


describe('removePeripheralDevice', () =>{
   

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