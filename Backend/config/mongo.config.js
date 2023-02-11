const mongoose = require('mongoose')


const uri = "mongodb+srv://appuser:ZMug1Q0PiSD5Z40X@clusternb.9cdqzwt.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error',(err)=>{
  console.log(err);
})

db.once('open',()=>{
  console.log('Database conncection established');
})

module.exports = db




