const Razorpay = require('razorpay');
const crypto = require('crypto');
const ServiceProvider = require('../Model/Service_ProviderModel');
const jwt = require('jsonwebtoken');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.initiateSbPayment = async (req, res) => {
  try {
    const { plan } = req.body;
    const user = await ServiceProvider.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Service provider not found" });

    const planAmounts = { Basic: 100, Standard: 190, Premium: 300 };
    if (!planAmounts[plan]) {
      return res.status(400).json({ error: 'Invalid plan selected.' });
    }

    const amount = planAmounts[plan]; 

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${user._id.toString().slice(-6)}_${Date.now()}`,
      notes: {
        plan,
        userId: user._id.toString()
      }
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      plan,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("initiatePayment error:", error);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};


exports.verifySbPayment = async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        plan,
        token
      } = req.body;
  
      let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
      

   
      const generatedSignature = crypto
        .createHmac("sha256", razorpay.key_secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
  
      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Invalid signature" });
      }

  
      console.log(generatedSignature);

      const user = await ServiceProvider.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "Service provider not found" });
  
      console.log(user);

      const creditsMap = { Basic: 30, Standard: 60, Premium: 110 };
      let prevCred=user.subscription.serviceCredits;
      let credits=0;
       credits = creditsMap[plan] + prevCred;
  
      console.log(credits);
      user.subscription = {
        isActive: true,
        plan,
        serviceCredits: credits,
        subscribedAt: new Date(),
        razorpaySubscriptionId: razorpay_order_id,
        status: 'active'
      };

      console.log(user.subscription);
  
      await user.save();
  
      res.status(200).json({ success: true, message: "Payment verified and subscription updated" });
    } catch (err) {
      console.error("verifyPayment error:", err);
      res.status(500).json({ error: "Payment verification failed" });
    }
  };


