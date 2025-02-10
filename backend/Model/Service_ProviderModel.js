const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date }  
});

module.exports = mongoose.model('Service_Provider', serviceProviderSchema);
