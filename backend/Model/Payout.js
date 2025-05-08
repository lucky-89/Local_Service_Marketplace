const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
  serviceProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service_Provider',
    required: true,
  },
  upiId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  weekStartDate: {
    type: Date,
    required: true,
  },
  weekEndDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'paid', 'failed'],
    default: 'pending',
  },
  razorpayTransferId: String,
  processedAt: Date,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Payout', payoutSchema);
