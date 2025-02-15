const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    
},
{ timestamps: true }
);



module.exports = mongoose.model('Client', clientSchema);
