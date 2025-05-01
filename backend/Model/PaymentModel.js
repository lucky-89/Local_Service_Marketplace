const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    bookingId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client.bookings' 
    },
    amount: Number,
    platformFee: Number,
    serviceFee: Number,
    paymentMethod: { 
        type: String, 
        enum: ['online', 'cash'] 
    },
    razorpayPaymentId: String,
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'], 
        default: 'pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Payment', paymentSchema);