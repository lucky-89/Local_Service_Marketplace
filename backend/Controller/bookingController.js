const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const ServiceProvider=require('../Model/Service_ProviderModel')
const Client=require('../Model/ClientModel')
exports.generateOTP = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const client = await Client.findOne({ 'bookings._id': bookingId });
        if (!client) return res.status(404).json({ message: 'Booking not found' });

        const booking = client.bookings.id(bookingId);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        booking.otp = otp;
        booking.otpExpires = otpExpires;
        await client.save();

        const msg = {
            to: client.email,
            from: process.env.SENDER_EMAIL,
            subject: 'Service Verification OTP',
            html: `<p>Your OTP is: ${otp}</p>`
        };
        await sgMail.send(msg);

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'OTP generation failed', error: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    const { bookingId } = req.params;
    const { otp } = req.body;

    try {
        const client = await Client.findOne({ 'bookings._id': bookingId });
        if (!client) return res.status(404).json({ message: 'Booking not found' });

        const booking = client.bookings.id(bookingId);
        if (booking.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
        if (booking.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP expired' });

        booking.otp = undefined;
        booking.otpExpires = undefined;
        await client.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'OTP verification failed', error: error.message });
    }
};

exports.completeBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { rating, comment } = req.body;

    try {
        const client = await Client.findOne({ 'bookings._id': bookingId });
        if (!client) return res.status(404).json({ message: 'Booking not found' });

        const booking = client.bookings.id(bookingId);
        booking.status = 'Completed';
        booking.review = { rating, comment };
        await client.save();

        const serviceProvider = await ServiceProvider.findById(booking.serviceProviderId);
        serviceProvider.tokens += 1;
        await serviceProvider.save();

        res.status(200).json({ message: 'Booking completed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Completion failed', error: error.message });
    }
};