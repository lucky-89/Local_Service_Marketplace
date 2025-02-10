const Service_Provider = require('../Model/Service_ProviderModel');
const bcrypt= require('bcryptjs');
const {sendOtp} = require('../otpService');
const jwt = require('jsonwebtoken');

// for service provider register

exports.registerServiceProvider= async(req,res)=>{

    const {name,email,password,category,price,phone}=req.body;

    try{
        const userExist= await Service_Provider.findOne({phone});

        if(userExist){
            return res.status(400).json({message:'User exists'});

        }
        const hashpass= await bcrypt.hash(password,12);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user= await Service_Provider.create({
            name,
            email,
            password:hashpass,
            category,
            price,
            phone,
            otp
        });
        const otpSent = await sendOtp(phone, otp);
        if (!otpSent) return res.status(500).json({ message: 'OTP sending failed' });
        res.status(201).json({ message: 'OTP sent, verify to complete registration' });

    }catch(error){
        res.status(500).json({message:'Error', error:error.message});
    }
}

// for service provider login

exports.loginServiceProvider= async (req,res)=>{

    const {email,password}= req.body;

    try{
        const user=await Service_Provider.findOne({email});
        if(!user){
            return res.status(400).json({message:'Either email or password does not match'});
        }
        if (!user.isVerified) return res.status(400).json({ message: 'Account not verified. Please verify OTP.' });
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Either email or password does not match'});
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
                res.status(200).json({ message: 'Login Successful', user,token });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// for profile

exports.getSpProfile = async (req, res) => {
    try {
        const user = await Service_Provider.findById(req.user.id).select("-password -otp -otpExpires");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};

// for service provider verify otp

exports.spverifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await Service_Provider.findOne({ email });

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

