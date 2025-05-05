const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../Model/PaymentModel');
const Client = require('../Model/ClientModel');
const ServiceProvider = require('../Model/Service_ProviderModel');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


const sendPaymentEmails = async (client, serviceProvider, amount) => {
    const clientMsg = {
        to: client.email,
        from: process.env.SENDER_EMAIL,
        subject: 'Payment Successful',
        html: `<h2>₹${amount} payment confirmed!</h2>
               <p>Service Provider: ${serviceProvider.name}</p>`
    };

    const spMsg = {
        to: serviceProvider.email,
        from: process.env.SENDER_EMAIL,
        subject: 'New Payment Received',
        html: `<h2>New payment from ${client.name}</h2>
               <p>Amount: ₹${amount}</p>`
    };

    await sgMail.send([clientMsg, spMsg]);
};

exports.initiatePayment = async (req, res) => {
    const { bookingId } = req.params;
    const { paymentMethod } = req.body;

    try {
        const client = await Client.findOne({ 'bookings._id': bookingId });
        if (!client) return res.status(404).json({ 
            success: false,
            message: 'Booking not found' 
        });

        const booking = client.bookings.id(bookingId);
        if (booking.status !== 'Confirmed') {
            return res.status(400).json({ 
                success: false,
                message: 'Booking not confirmed' 
            });
        }

        booking.paymentMethod = paymentMethod;
        await client.save();

        if (paymentMethod === 'Online') {
            const serviceProvider = await ServiceProvider.findById(booking.serviceProviderId);
            const platformFee = 100;
            const totalAmount = serviceProvider.price + platformFee;

            const options = {
                amount: totalAmount * 100,
                currency: 'INR',
                receipt: `receipt_${bookingId}`,
                payment_capture: 1
            };

            const razorpayOrder = await razorpay.orders.create(options);

            const payment = new Payment({
                bookingId: booking._id,
                amount: totalAmount,
                platformFee,
                serviceFee: serviceProvider.price,
                paymentMethod: 'online',
                razorpayPaymentId: razorpayOrder.id,
                status: 'pending'
            });
            await payment.save();

            res.status(200).json({
                success: true,
                message: 'Payment initiated',
                order: razorpayOrder,
                key: process.env.RAZORPAY_KEY_ID
            });
        } else {
            const serviceProvider = await ServiceProvider.findById(booking.serviceProviderId);
            const platformFee = 100;
            const totalAmount = platformFee;

            const payment = new Payment({
                bookingId: booking._id,
                amount: totalAmount,
                platformFee,
                serviceFee: 0,
                paymentMethod: 'cash',
                status: 'pending'
            });
            await payment.save();

            // Update booking and tokens
          
           
            
            await Promise.all([client.save(), serviceProvider.save()]);
            await sendPaymentEmails(client, serviceProvider, totalAmount);

            res.status(200).json({
                success: true,
                message: 'Cash payment recorded'
            });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Payment initiation failed',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
};

exports.verifyPayment = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    try {
        // 1. Validate signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');
        console.log("sig",generatedSignature);

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

        // 2. Update payment status
        const payment = await Payment.findOneAndUpdate(
            { razorpayPaymentId: razorpay_order_id },
            { 
                status: 'completed',
                razorpayPaymentId: razorpay_payment_id
            },
            { new: true }
        );

        console.log("payment",payment);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment record not found'
            });
        }

        // 3. Update client booking
        const client = await Client.findOne({ 'bookings._id': payment.bookingId });
        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client with booking not found'
            });
        }
        console.log("client",client);

        const booking = client.bookings._id(payment.bookingId);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found in client'
            });
        }
        console.log("booking",booking);

        booking.paymentStatus = 'Paid';

        const serviceProvider = await ServiceProvider.findById(booking.serviceProviderId);
        if (!serviceProvider) {
            return res.status(404).json({
                success: false,
                message: 'Service provider not found'
            });
        }
        console.log("serviceP",serviceProvider);

        serviceProvider.tokens = 1;

        // 5. Save all & notify
        await Promise.all([client.save(), serviceProvider.save()]);
        // await sendPaymentEmails(client, serviceProvider, payment.amount);

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            payment: {
                id: payment._id,
                amount: payment.amount,
                method: payment.paymentMethod
            }
        });

    } catch (error) {
        console.error('Payment Verification Error:', error); // helpful during development
        res.status(500).json({
            success: false,
            message: 'Payment verification failed',
            error: error.message // Show real error message
        });
    }
};