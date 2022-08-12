require('dotenv').config();
const express = require('express');
const path = require('path');
const connect = require("mongoose").connect;

let port=process.env.PORT || 3000;
const app= express();
app.use(express.json());

//database connection
connect(process.env.DATABASE_URL)
   .then(()=> console.log('DB is connected'))
   .catch(err => console.error(err));

//Routes
app.use( '/api/gateways',require('./routes/gatewayroutes'));
app.use( '/api/peripherals',require('./routes/peripheralroutes'));

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(port, ()=> {
    console.log(`Server started on port ${port}`);
});