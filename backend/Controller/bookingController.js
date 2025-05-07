const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const ServiceProvider = require('../Model/Service_ProviderModel');
const Client = require('../Model/ClientModel');

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

        const recipientEmail = client.email;
        if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        const msg = {
            to: recipientEmail,
            from: process.env.SENDER_EMAIL,
            subject: 'Service Verification OTP',
            html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        };

        console.log(`Sending OTP ${otp} to ${recipientEmail}`);

        try {
            await sgMail.send(msg);
        } catch (emailError) {
            console.error('SendGrid error:', emailError.response?.body || emailError.message);

        

            return res.status(500).json({ message: 'SendGrid failed', error: emailError.message });
        }

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('OTP generation failed:', error.message);
        res.status(500).json({ message: 'OTP generation failed', error: error.message });
    }
};

// Verify OTP
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
        console.error('OTP verification failed:', error.message);
        res.status(500).json({ message: 'OTP verification failed', error: error.message });
    }
};

// Complete the booking
exports.markFeedback = async (req, res) => {
    const { bookingId } = req.params;
    const { rating, comment } = req.body;

    try {
        const client = await Client.findOne({ 'bookings._id': bookingId });
        if (!client) return res.status(404).json({ message: 'Booking not found' });

        const booking = client.bookings.id(bookingId);
        
        booking.review = { rating, comment };
        await client.save();

        

        res.status(200).json({ message: 'Feedback given successfully' });
    } catch (error) {
        console.error('feedback failed:', error.message);
        res.status(500).json({ message: 'feedback failed', error: error.message });
    }
};

exports.completion=async (req,res)=>{

    const {bookingId}=req.params;
    const {status}=req.body;

    try {
        const client = await Client.findOne({ 'bookings._id': bookingId });
        if (!client) return res.status(404).json({ message: 'Booking not found' });

        const booking = client.bookings.id(bookingId);
        if(status==='Completed'){
            booking.status = status;
        }
        
        

        const serviceProvider = await ServiceProvider.findById(booking.serviceProviderId);

        if (serviceProvider) {
            serviceProvider.tokens = 2;
            serviceProvider.completedService.push({
                clientId: client._id,
                clientName: client.name,
                clientEmail: client.email,
                serviceDate: booking.serviceDate,
                address: booking.address,
                serviceCategory:serviceProvider.category,
                profile:serviceProvider.profileImage,
                feedback: booking.review || null,
                completedAt: new Date()
            });
            await serviceProvider.save();
        }
        await client.save();


        res.status(200).json({ message: 'Booking completed successfully' });
    } catch (error) {
        console.error('Completion failed:', error.message);
        res.status(500).json({ message: 'Completion failed', error: error.message });
    }
}

