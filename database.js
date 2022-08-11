const mongoose = require("mongoose");
const {connect}=mongoose;
const URI = process.env.DATABASE_URL;

connect(URI)
   .then(()=> console.log('DB is connected'))
   .catch(err => console.error(err));


module.exports = mongoose;