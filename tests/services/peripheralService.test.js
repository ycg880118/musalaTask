const peripheralService= require('../../services/peripheralService');
const db= require('../../db/db');
const {Peripheral }= require('../../models/peripheralModel');

describe('addPeripheralDevice', ()=>{


    it('Should throw an exception if _id is not valid id',async ()=>{  
        //TODO
        const pyload={gatewayId:'1',peripheral:{uid:1,}}
        await expect(async ()=>{await peripheralService.addPeripheralDevice('1')}).rejects.toThrow("Validation error");
    });
});