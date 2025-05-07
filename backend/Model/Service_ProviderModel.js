const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    tokens: { type: Number, default: 2 },
    isAvailable: { type: Boolean, default: false }, 
    servicePinCodes: { type: [String], default: [] },
    lastUpdated: { type: Date, default: Date.now },
    profileImage: { type: String}, 
    aadharImage: { type: String },  
    isVerified: { type: Boolean, default: false },
    completedService: [{
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    clientName: String,
    clientEmail: String,
    serviceDate: Date,
    address: String,
    serviceCategory:String,
    profile:String,
    feedback: {
        rating: Number,
        comment: String
    },
    completedAt: Date
}]

}, { timestamps: true });

module.exports = mongoose.model('Service_Provider', serviceProviderSchema);

