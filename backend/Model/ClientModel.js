const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },  
    otpExpires: { type: Date }  
});

module.exports = mongoose.model('Client', clientSchema);
