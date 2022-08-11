require('dotenv').config();
const express = require('express');
const path = require('path');
require('./database');

const app= express();

//Settings
//app.set('port',process.env.PORT || 3000);
let port=process.env.PORT || 3000;

//Middlewares
app.use(express.json());

//Routes
app.use( '/api/gateway',require('./routes/gatewayroutes'));
app.use( '/api/peripheral',require('./routes/peripheralroutes'));

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(port, ()=> {
    console.log(`Server started on port ${port}`);
});