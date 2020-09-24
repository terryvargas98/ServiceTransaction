 const moogose = require("mongoose");

 moogose.set('useFindAndModify', false);
 require('dotenv').config({ path: '.env' });
 moogose.connect(process.env.MONGODB_URI, {

     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true,

 }).then(db => console.log('Db is connected', db.connection.host));

 exports.module = moogose;