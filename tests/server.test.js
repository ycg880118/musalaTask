const server= require('../controler/server');
const db= require('../db/db');

describe('getGateways' , () =>{

    it('Should return an object with status = 200 and data = an object with result = the gateway with the given id', async () =>{
        db.getGateway =async (_id) =>{
            //console.log('Fake db.getGateway call...');
            return {id : _id, serialNumber:'453453',name:'name', ipv4Address: '192.168.1.20'};
        };
        let gateway= await server.getGateways('11111');
        expect(gateway).toMatchObject({status:200,data:{'result':{id:'11111'}}});
    });

    it('Should return an object with status = 200 and data = an object with result = an array of gateways if id is null or absent', async () =>{
        db.getAllGateways =async () =>{
            //console.log('Fake db.getGateways call...');
            return [{id :'1434'},{id :'343'}];
        };
        let gateway= await server.getGateways();
        expect(gateway).toMatchObject({status:200,data:{'result':[{id :'1434'},{id :'343'}]}});
    });

    it('Should return an object with status = 500 and data = an object with error = an error string if db throws', async ()=>{
        db.getGateway =async (_id) =>{
            //console.log('Fake db.getGateway call...');
            throw(new Error('unidentified exception'));
        };        
        let result= await server.getGateways('11111');
        expect(result).toMatchObject({status:500});
    });

});

describe('addGateway',()=>{
    it('Should return an object with status = 500 and msg = an object with error = an error string if ip is incorrect',async ()=>{
        let result=await server.addGateway('232','name','323');
        expect(result).toMatchObject({status:500,msg:{'error':'Invalid Ipv4 address'}});
    })

    it('Should return an object with status = 200 and msg = an object with result = a success string if ip is correct', async () =>{
        db.addGateway =async (serialNumber, name, ipv4Address) =>{
            //console.log('Fake db.addGateway call...');
            return {};
        };
        let result= await server.addGateway('232','name','192.168.1.20');
        expect(result).toMatchObject({status:200,msg:{'result':`Gateway 232 added successfully`}});
    });

    it('Should return an object with status = 500 and msg = an object with error = an error string if db call throws', async ()=>{
        db.addGateway =async (serialNumber, name, ipv4Address) =>{
            //console.log('Fake db.addGateway call...');
            throw(new Error('unidentified exception'));
        };        
        let result= await server.addGateway('232','name','192.168.1.20');
        expect(result).toMatchObject({status:500});
    });

});

describe('removeGateway',()=>{
    it('Should return an object with status = 200 and msg = an object with result = a success string if object with given id exists', async () =>{
        db.removeGateway =async (_id) =>{
            //console.log('Fake db.removeGateway call...');
            return {_id:_id};
        };
        let result= await server.removeGateway('1');
        expect(result).toMatchObject({status:200,msg:{'result':`Gateway 1 removed`}});
    });
    it('Should return an object with status = 200 and msg = an object with result = a not found string if object with given id not exists', async () =>{
        db.removeGateway =async (_id) =>{
            //console.log('Fake db.removeGateway call...');
            return null;
        };
        let result= await server.removeGateway('1');
        expect(result).toMatchObject({status:200,msg:{'result':`There is no Gateway with id = 1`}});
    });

    it('Should return an object with status = 500 and msg = an object with error = an error string if db call throws', async ()=>{
        db.removeGateway =async (_id) =>{
            //console.log('Fake db.addGateway call...');
            throw(new Error('unidentified exception'));
        };        
        let result= await server.removeGateway('1');
        expect(result).toMatchObject({status:500});
    });

});


