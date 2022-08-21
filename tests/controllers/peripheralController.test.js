const peripheralController=require('../../controllers/peripheralController');
const peripheralService = require('../../services/peripheralService');


describe('addPeripheral' , ()=>{
    it('Should send status 200 and a json object with the gateway where the peripheral was added',async ()=>{
        peripheralService.addPeripheralDevice = (params) =>{  
                    
            return {"_id": params.gatewayId, ipv4Address: "192.168.1.20", name: "name", serialNumber: "3",peripheralDevices:[params.peripheral]};
        };
        
        let handlerStatus = 0;
        let handlerResponse = {};
        const req = {  
            body:{gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'VendorX',date:'2022-08-21T16:09:13.170Z',status:'Online'}}        
          };
        
          const res = {
            json(body) { 
              handlerResponse = body;
            },
            status(status) {
              handlerStatus = status;
              return this;
            },
          } ;
          await peripheralController.addPeripheral(req,res);
          expect(handlerStatus).toBe(200);
          expect(handlerResponse).toMatchObject({"result": {"data": {"_id": "54759eb3c090d83494e2d804", "ipv4Address": "192.168.1.20", "name": "name", "serialNumber": "3",peripheralDevices:[req.body.peripheral]}, "msg": `Peripheral ${req.body.peripheral.uid} added successfully`}});
      

    });

    it('Should send status 404 and a json object with an error if there is no gateway with the given id',async ()=>{
        peripheralService.addPeripheralDevice = (_params) =>{  
                    
            return null;
        };
        
        let handlerStatus = 0;
        let handlerResponse = {};
        const req = {  
            body:{gatewayId:'54759eb3c090d83494e2d804',peripheral:{uid:1,vendor:'VendorX',date:'2022-08-21T16:09:13.170Z',status:'Online'}}        
          };
        
          const res = {
            json(body) { 
              handlerResponse = body;
            },
            status(status) {
              handlerStatus = status;
              return this;
            },
          } ;
          await peripheralController.addPeripheral(req,res);
          expect(handlerStatus).toBe(404);
          expect(handlerResponse).toMatchObject({error:'There is no gateway with the given id'});
      
    
          //TODO
          //I dont have time to finish all test cases sorry :(.
    });

});

describe('removePeripheral', ()=>{
    it('Should send status 200 and a json object with the gateway where the peripheral was removed',async ()=>{
        peripheralService.removePeripheralDevice = (params) =>{  
                    
            return {"_id": params.gatewayId, ipv4Address: "192.168.1.20", name: "name", serialNumber: "3",peripheralDevices:[]};
        };
        
        let handlerStatus = 0;
        let handlerResponse = {};
        const req = {  
            params:{gatewayId:'54759eb3c090d83494e2d804',peripheralId:'34759eb3c090d83494e2d802'}        
          };
        
          const res = {
            json(body) { 
              handlerResponse = body;
            },
            status(status) {
              handlerStatus = status;
              return this;
            },
          } ;
          await peripheralController.removePeripheral(req,res);
          expect(handlerStatus).toBe(200);
          expect(handlerResponse).toMatchObject({"result": {"data": {"_id": "54759eb3c090d83494e2d804", "ipv4Address": "192.168.1.20", "name": "name", "serialNumber": "3",peripheralDevices:[]}, "msg": `Peripheral ${req.params.peripheralId} removed successfully`}});
      

    });

    it('Should send status 404 and a json object with an error if there is no gateway with the given id',async ()=>{
        peripheralService.removePeripheralDevice = (_params) =>{  
                    
            return null;
        };
        
        let handlerStatus = 0;
        let handlerResponse = {};
        const req = {  
            params:{gatewayId:'54759eb3c090d83494e2d804',peripheralId:'34759eb3c090d83494e2d802'}        
          };
        
          const res = {
            json(body) { 
              handlerResponse = body;
            },
            status(status) {
              handlerStatus = status;
              return this;
            },
          } ;
          await peripheralController.removePeripheral(req,res);
          expect(handlerStatus).toBe(404);
          expect(handlerResponse).toMatchObject({error:'There is no gateway with the given id'});
      

    });

        //TODO
        //I dont have time to finish all test cases sorry :(.
});