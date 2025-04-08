const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    category: { type: String }, 
    servicePinCode: { type: String }, 
    isVerified: { type: Boolean, default: false },
    bookings: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Unique ID for each booking
        serviceProviderId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Service_Provider' 
        },
        serviceProviderName: { type: String },
        serviceProviderPhone: { type: String },
        serviceProviderEmail: { type: String },
        serviceLocation: { type: String },
        serviceDate: { type: Date, default: Date.now },
        status: { 
            type: String, 
            enum: ['Pending', 'Confirmed', 'Completed'], 
            default: 'Pending' 
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);