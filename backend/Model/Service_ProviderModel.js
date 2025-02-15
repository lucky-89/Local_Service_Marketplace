const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    
    },
    { timestamps: true }
);


module.exports = mongoose.model('Service_Provider', serviceProviderSchema);

