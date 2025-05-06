const sgMail = require('@sendgrid/mail');

const ServiceProvider=require('../Model/Service_ProviderModel')
const Client=require('../Model/ClientModel');
const Payment = require('../Model/PaymentModel');;


exports.sendEmail = async (req, res) => {
    const { razorpay_payment_id } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        const payment = await Payment.findOne({ razorpayPaymentId: razorpay_payment_id });
        console.log(payment);
        const client = await Client.findOne({ 'bookings._id': payment.bookingId });
        console.log(client);
        if (!client) return res.status(404).json({ message: 'Booking not found' });

        const booking = client.bookings.id(payment.bookingId);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found in client'
            });
        }
        console.log(booking);

        const serviceProvider = await ServiceProvider.findById(booking.serviceProviderId);

        if (!serviceProvider) {
            return res.status(404).json({
            success: false,
            message: 'Service provider not found'
            });
        }
        console.log(serviceProvider);

        const msg = {
            to: client.email,
            from: process.env.SENDER_EMAIL,
            subject: 'Payment Confirmation',
            html: `<p>Your OTP is: ${payment.amount}</p>`
        };
        const spmsg = {
            to: serviceProvider.email,
            from: process.env.SENDER_EMAIL1,
            subject: 'Payment Confirmation',
            html: `<p>Your OTP is: ${payment.amount}</p>`
        };

        await sgMail.send(msg);

        setTimeout(async()=>{
            sgMail.setApiKey(process.env.SENDGRID_API_KEY1);
            await sgMail.send(spmsg);
        },5000);
        

        res.status(200).json({ message: 'Confirmation sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Confirmation failed', error: error.message });
    }
};


