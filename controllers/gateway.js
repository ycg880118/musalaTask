const mongoose = require("mongoose");
const Gateway = mongoose.model("Gateway");

//GET - Return all gateway in the DB
exports.findAllGateways = function (req, res) {
    Gateway.find({}, function (err, gateway) {
        Peripheral.populate(gateway, { path: "peripheral" }, function (err, gateway) {
          res.status(200).send(gateway);
        });
      });
};

//GET - Return a gateway with specified ID
exports.findById = function(req, res) {
    Gateway.findById(req.params.id, function(err, gateway) {
    if(err) return res.send(500., err.message);

    console.log('GET /gateway/' + req.params.id);
        res.status(200).jsonp(gateway);
    });
};

//POST - Insert a new gateway in the DB
exports.addGateway = function (req, res) {
    console.log("POST");
    console.log(req.body);
  
    var gateway = new Gateway({
      serialnumber: req.body.serialnumber,
      humanreadablename: req.body.humanreadablename,
      IPv4address: req.body.IPv4address,
      peripheral: req.body.peripheral,
    });
  
    gateway.save(function (err, gateway) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(gateway);
    });
  };

  //PUT - Update a register already exists
exports.updateGateway = function (req, res) {
    Gateway.findById(req.params.id, function (err, gateway) {
      gateway.serialnumber = req.body.petId;
      gateway.humanreadablename = req.body.humanreadablename;
      gateway.IPv4address = req.body.IPv4address;
      gateway.peripheral = req.body.peripheral;
      
  
      gateway.save(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(tvshow);
      });
    });
  };

  //DELETE - Delete a Gateway with specified ID
exports.deleteGateway = function (req, res) {
    Gateway.findById(req.params.id, function (err, gateway) {
      gateway.remove(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send();
      });
    });
  };
  
  
  