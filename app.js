require('dotenv').config();
const express = require('express');
const connect = require("mongoose").connect;
const path = require('path');
const cors = require('cors');
const gateways=require('./routes/gatewayRoutes');
const peripherals=require('./routes/peripheralRoutes');

let port=3400;
const app= express();

//Connect to db
connect(`mongodb://${process.env.DATABASE_ADDRESS}/musala`)
.then(()=> console.log('Connected to db'))
.catch(err => console.error(err));

//Middlewares
app.use(express.json());
app.use(cors());
app.options('*', cors());

//Routes
app.use( '/api/gateways',gateways);
app.use( '/api/peripherals',peripherals);

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(port, ()=> {
    console.log(`Server started on port ${port}`);
});