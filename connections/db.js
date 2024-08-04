const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/todolistDB');

const db = mongoose.connection;

db.on('error', console.error);
db.once('open', ()=>{
    console.log('Connected to MongoDB');
});

module.exports = db;