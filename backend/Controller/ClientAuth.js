const Client = require('../Model/ClientModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {sendOtp} = require('../otpService');



exports.registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const userExist = await Client.findOne({ phone });
        if (userExist) return res.status(400).json({ message: 'Phone number already registered' });

        const hashpass = await bcrypt.hash(password, 12);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await Client.create({ name, email, phone, password: hashpass, otp });

        const otpSent = await sendOtp(phone, otp);
        if (!otpSent) return res.status(500).json({ message: 'OTP sending failed' });

        res.status(201).json({ message: 'OTP sent, verify to complete registration' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Client.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        if (!user.isVerified) return res.status(400).json({ message: 'Account not verified. Please verify OTP.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: 'Login Successful', user,token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// for profile

exports.getUserProfile = async (req, res) => {
    try {
        const user = await Client.findById(req.user.id).select("-password -otp -otpExpires");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};


// client verification of otp

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await Client.findOne({ email });

        if (!user || !user.otp) {
            return res.status(400).json({ message: "OTP not generated. Request a new one." });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP. Try again." });
        }

        if (new Date() > user.otpExpires) {
            return res.status(400).json({ message: "OTP expired. Request a new one." });
        }

        user.otp = null;
        user.otpExpires = null;
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully." });

    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP.", error: error.message });
    }
};

