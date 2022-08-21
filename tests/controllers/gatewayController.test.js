process.env['NODE_DEV'] = 'TEST';
const gatewayService= require('../../services/gatewayService');
const gatewayController = require('../../controllers/gatewayController');

describe('getAllGateways', ()=>{

    it('Should send tatus 200 and a json with an array of gateways in data', async () =>{
        gatewayService.getGateways = () =>{  
                    
            return [{_id : '54759eb3c090d83494e2d804', serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'}];
        };

        let handlerStatus = 0;
        let handlerResponse = {};
        const req = {          
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

        await gatewayController.getAllGateways(req,res);
        expect(handlerStatus).toBe(200);
        expect(handlerResponse).toMatchObject({"result": {"data": [{"_id": "54759eb3c090d83494e2d804", "ipv4Address": "192.168.1.20", "name": "name", "serialNumber": "3"}], "msg": "ok"}});
    });

    it('Should send status 500 and a json with the error',async ()=>{
        gatewayService.getGateways = () =>{                     
            throw(new Error('Gateway service error'));
        };
        let handlerStatus = 0;
        let handlerResponse = {};
        const req = {};
        
          const res = {
            json(body) { 
              handlerResponse = body;
            },
            status(status) {
              handlerStatus = status;
              return this;
            },
          } ;
          
        
        await gatewayController.getAllGateways(req,res);
        expect(handlerStatus).toBe(500);
        expect(handlerResponse).toMatchObject({error:'Error: Gateway service error'})
    });

});


describe('getGateway', ()=>{
    it('Should send tatus 200 and a json with a gateway in data', async () =>{
        gatewayService.getGateway = (id) =>{  
                    
            return {_id : '54759eb3c090d83494e2d804', serialNumber:'3',name:'name', ipv4Address: '192.168.1.20'};
        };

        let handlerStatus = 0;
        let handlerResponse = {};
        const req = {
            params:{_id:'54759eb3c090d83494e2d804'}            
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

        await gatewayController.getGateway(req,res);
        expect(handlerStatus).toBe(200);
        expect(handlerResponse).toMatchObject({"result": {"data": {"_id": "54759eb3c090d83494e2d804", "ipv4Address": "192.168.1.20", "name": "name", "serialNumber": "3"}, "msg": "ok"}});
    });
    it('Should send tatus 404 and a json object with the error if there is no gateway with the given id', async () =>{
        gatewayService.getGateway = (_id) =>{ 
            return null;
        };

        let handlerStatus = 0;
        let handlerResponse = {};
        const req = {
            params:{_id:'54759eb3c090d83494e2d804'}            
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

        await gatewayController.getGateway(req,res);
        expect(handlerStatus).toBe(404);
        expect(handlerResponse).toMatchObject({error:'There is no gateway with the given id'});
    });

    it('Should send tatus 500 and a json object with the error if the given id is invalid', async () =>{
        gatewayService.getGateway = (_id) =>{ 
            return null;
        };

        let handlerStatus = 0;
        let handlerResponse = {};
        const req = {
            params:{_id:'54759e'}            
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

        await gatewayController.getGateway(req,res);
        expect(handlerStatus).toBe(500);
        expect(handlerResponse).toMatchObject({error:/^Error: Validation error:/});
    });
});
    describe('addGateway', ()=>{
        it('Should send tatus 200 and a json with the added gateway in data', async () =>{
            gatewayService.addGateway = (gateway) =>{                          
                return {_id : '54759eb3c090d83494e2d804', serialNumber:gateway.serialNumber,name:gateway.name, ipv4Address: gateway.ipv4Address};
            };
    
            let handlerStatus = 0;
            let handlerResponse = {};
            const req = {
                body:{serialNumber:'ERJSF3',name:'Gateway1',ipv4Address:'192.168.1.20'}            
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
    
            await gatewayController.addGateway(req,res);
            expect(handlerStatus).toBe(200);
            expect(handlerResponse).toMatchObject({"result": {"data": {"_id": "54759eb3c090d83494e2d804", "serialNumber":'ERJSF3',"name":'Gateway1',"ipv4Address":'192.168.1.20'}, msg:`Gateway ${req.body.serialNumber} added successfully`}});
        });
        it('Should send tatus 500 and a json object with the error if validations fail', async () =>{
            let handlerStatus = 0;
            let handlerResponse = {};
            const req = {
                body:{}            
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
    
            await gatewayController.addGateway(req,res);
            expect(handlerStatus).toBe(500);
            expect(handlerResponse).toMatchObject({error:/^Error: Validation error:/});
        });

        it('Should send tatus 500 and a json object with the error if gateway service throws', async () =>{
            gatewayService.addGateway = (_gateway) =>{                          
                throw new Error('Gateway service error');
            };
            let handlerStatus = 0;
            let handlerResponse = {};
            const req = {
                body:{serialNumber:'ERJSF3',name:'Gateway1',ipv4Address:'192.168.1.20'}            
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
    
            await gatewayController.addGateway(req,res);
            expect(handlerStatus).toBe(500);
            expect(handlerResponse).toMatchObject({error:/^Gateway service error/});
        });

    });

    describe('removeGateway', ()=>{
        it('Should send tatus 200 and a json with the removed gateway in data', async () =>{
            gatewayService.removeGateway = (_id) =>{                          
                return {_id : _id, serialNumber:'ERJSF3',name:'Gateway1',ipv4Address:'192.168.1.20'};
            };
    
            let handlerStatus = 0;
            let handlerResponse = {};
            const req = {
                params:{_id:'54759eb3c090d83494e2d804'}            
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
    
            await gatewayController.removeGateway(req,res);
            expect(handlerStatus).toBe(200);
            expect(handlerResponse).toMatchObject({"result": {"data": {"_id": "54759eb3c090d83494e2d804", "serialNumber":'ERJSF3',"name":'Gateway1',"ipv4Address":'192.168.1.20'}, msg:`Gateway ${req.params._id} removed successfully`}});
        });

        it('Should send tatus 500 and a json object with the error if validations fail', async () =>{
            let handlerStatus = 0;
            let handlerResponse = {};
            const req = {
                params:{_id:'54759eb3c090d83494e'}            
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
    
            await gatewayController.removeGateway(req,res);
            expect(handlerStatus).toBe(500);
            expect(handlerResponse).toMatchObject({error:/^Error: Validation error:/});
        });

        it('Should send tatus 404 and a json object with the error if there is no gateway with the given id', async () =>{
            gatewayService.removeGateway = (_id) =>{ 
                return null;
            };
    
            let handlerStatus = 0;
            let handlerResponse = {};
            const req = {
                params:{_id:'54759eb3c090d83494e2d804'}            
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
    
            await gatewayController.removeGateway(req,res);
            expect(handlerStatus).toBe(404);
            expect(handlerResponse).toMatchObject({error:'There is no gateway with the given id'});
        });

        it('Should send tatus 500 and a json object with the error if gateway service throws', async () =>{
            gatewayService.removeGateway = (_id) =>{                          
                throw new Error('Gateway service error');
            };
            let handlerStatus = 0;
            let handlerResponse = {};
            const req = {
                params:{_id:'54759eb3c090d83494e2d804'}         
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
    
            await gatewayController.removeGateway(req,res);
            expect(handlerStatus).toBe(500);
            expect(handlerResponse).toMatchObject({error:/^Gateway service error/});
        });
    });

    describe('validateGateway', ()=>{
        it('Should return no error if gateway params are valid', () =>{
            const {error} =gatewayController.validateGateway({serialNumber:'ERJSF3',name:'Gateway1',ipv4Address:'192.168.1.20'});
            expect(error).toBe(undefined);
        });

        it('Should return error if serialNumber is empty', () =>{
            const {error} =gatewayController.validateGateway({serialNumber:'',name:'Gateway1',ipv4Address:'192.168.1.20'});
            expect(error.details[0].message).toBe('\"serialNumber\" is not allowed to be empty');
        });

        it('Should return error if name is empty', () =>{
            const {error} =gatewayController.validateGateway({serialNumber:'ERJSF3',name:'',ipv4Address:'192.168.1.20'});
            expect(error.details[0].message).toBe('\"name\" is not allowed to be empty');
        });

        it('Should return error if ipv4Address is invalid', () =>{
            const {error} =gatewayController.validateGateway({serialNumber:'ERJSF3',name:'Gateway1',ipv4Address:'192.168'});
            expect(error.details[0].message).toBe('\"ipv4Address\" must be a valid ip address of one of the following versions [ipv4] with a optional CIDR');
        });


    });

    describe('validateId', ()=>{
        it('Should return no error if id is valid', () =>{
            const {error} =gatewayController.validateId({_id:'54759eb3c090d83494e2d804'});
            expect(error).toBe(undefined);
        });
        it('Should return error if id is invalid', () =>{
            const {error} =gatewayController.validateId({_id:'54759eb3c090d834'});
            expect(error.details[0].message).toBe('\"_id\" length must be 24 characters long');
        });
    })



