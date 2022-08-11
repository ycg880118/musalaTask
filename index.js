const express = require('express');
const path = require('path');

const {mongoose} = require('./database').default;

const app= express();

//Settings
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(express.json());

//Routes
app.use( '/api/gateway',require('./routes/gatewayroutes'));
app.use( '/api/peripheral',require('./routes/peripheralroutes'));

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(3000, ()=> {
    console.log('server on port 3000');

});