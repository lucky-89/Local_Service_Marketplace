const Payout = require('../models/Payout');
const ServiceProvider = require('../models/Service_ProviderModel');
const razorpay = require('../utils/razorpay');

// Helper: Get current week range
const getWeekRange = () => {
  const now = new Date();
  const day = now.getDay(); // 0-6 (Sun-Sat)
  const sunday = new Date(now.setDate(now.getDate() - day));
  const monday = new Date(new Date(sunday).setDate(sunday.getDate() - 6));
  return { weekStart: monday, weekEnd: sunday };
};

// Create payouts for all providers
exports.generateWeeklyPayouts = async (req, res) => {
  const { weekStart, weekEnd } = getWeekRange();

  try {
    const providers = await ServiceProvider.find({});

    const payouts = [];

    for (const provider of providers) {
      // You must have booking history or earnings per provider; mock calculation here
      const totalEarnings = provider.weeklyEarnings || 0;
      if (totalEarnings <= 0 || !provider.upiId) continue;

      const newPayout = new Payout({
        serviceProvider: provider._id,
        upiId: provider.upiId,
        amount: totalEarnings,
        weekStartDate: weekStart,
        weekEndDate: weekEnd,
        status: 'pending',
      });

      await newPayout.save();
      payouts.push(newPayout);
    }

    res.status(200).json({ message: "Weekly payouts generated", payouts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin triggers payment
exports.processPayout = async (req, res) => {
  const { payoutId } = req.params;
  try {
    const payout = await Payout.findById(payoutId).populate("serviceProvider");
    if (!payout) return res.status(404).json({ message: "Payout not found" });

    if (payout.status === 'paid') {
      return res.status(400).json({ message: "Already paid" });
    }

    const transfer = await razorpay.payouts.create({
      account_number: process.env.RAZORPAY_ACCOUNT_NO, // from Razorpay dashboard
      fund_account: {
        account_type: "vpa",
        vpa: { address: payout.upiId },
        contact: {
          name: payout.serviceProvider.name,
          type: "employee",
          reference_id: payout.serviceProvider._id.toString(),
          email: payout.serviceProvider.email,
        },
      },
      amount: payout.amount * 100, // INR in paisa
      currency: "INR",
      mode: "UPI",
      purpose: "payout",
      queue_if_low_balance: true,
    });

    payout.status = 'paid';
    payout.razorpayTransferId = transfer.id;
    payout.processedAt = new Date();
    await payout.save();

    res.status(200).json({ message: "Payout processed", payout });
  } catch (err) {
    console.error("Payout error", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all payouts (admin)
exports.getAllPayouts = async (req, res) => {
  try {
    const payouts = await Payout.find().populate('serviceProvider');
    res.status(200).json(payouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
