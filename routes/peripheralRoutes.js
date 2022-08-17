const express = require('express');
const router = express.Router();
const gatewayController=require('../controllers/gatewayController');

//Add peripheral
router.post('/', gatewayController.addPeripheral);
