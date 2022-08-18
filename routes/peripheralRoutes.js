const express = require('express');
const router = express.Router();
const peripheralController=require('../controllers/peripheralController');

//Add peripheral
router.post('/', peripheralController.addPeripheral);
router.delete('/:gatewayId/:peripheralId',peripheralController.removePeripheral);

module.exports = router;
