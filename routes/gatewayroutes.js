const express = require('express');
const router = express.Router();
const gatewayController=require('../controllers/gatewayController');

//List all gateways
router.get('/' , gatewayController.getAllGateways);
//Get one gateway
router.get('/:_id' , gatewayController.getGateway);
//Add Gateway
router.post('/', gatewayController.addGateway);
//Delete gateway
router.delete('/:_id', gatewayController.removeGateway);


module.exports = router;