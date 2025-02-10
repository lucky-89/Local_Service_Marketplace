const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOtp = async (phone, otp) => {
    try {
        await client.messages.create({
            body: `Your OTP for verification is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });
        return true;
    } catch (error) {
        console.error("Twilio Error:", error);
        return false;
    }
};
