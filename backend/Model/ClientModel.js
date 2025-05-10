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
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        serviceProviderId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Service_Provider' 
        },
        serviceProviderName: { type: String },
        serviceProviderPhone: { type: String },
        serviceProviderEmail: { type: String },
        serviceLocation: { type: String },
        serviceCategory:{type:String},
        spProfile:{type:String},
        serviceDate: { type: Date, default: Date.now },
        status: { 
            type: String, 
            enum: ['Pending', 'Confirmed','Rejected', 'Completed'], 
            default: 'Pending' 
        },
        paymentStatus: { 
            type: String, 
            enum: ['Pending', 'Paid'], 
            default: 'Pending' 
        },
        paymentMethod: {
            type: String,
            enum: ['Cash', 'Online']
        },
        otp: String,
        otpExpires: Date,
        review: {
            rating: { 
                type: Number, 
                min: 1, 
                max: 5 
            },
            comment: String
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);