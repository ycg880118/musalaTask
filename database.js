import mongoose, { connect } from 'mongoose';
const URI = 'mongodb://localhost/managing-gateways';

connect(URI)
   .then(()=> console.log('DB is connected'))
   .catch(err => console.error(err));


export default mongoose;