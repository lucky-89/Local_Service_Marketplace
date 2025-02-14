const User = require('../Model/Service_ProviderModel');
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendPushNotification = require("../sendNotification");

const router = express.Router();

const admin = require("firebase-admin");
// for service provider register

exports.registerServiceProvider= async(req,res)=>{
try{
    const {name,email,password,category,price,phone}=req.body;
 if (!phone || !fcmToken) {
            return res.status(400).json({ message: "Phone and FCM Token are required" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);

        await User.create({ name, phone, email, password, otp, category, price });

        await sendPushNotification(fcmToken, "OTP Verification", `Your OTP is: ${otp}`);

        res.json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    };
    

// for service provider login

exports.loginServiceProvider= async (req,res)=>{

    const {email,password}= req.body;

    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Either email or password does not match'});
        }
        if (!user.verified) return res.status(400).json({ message: 'Account not verified. Please verify OTP.' });
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
        const user = await User.findById(req.user.id).select("-password -otp -otpExpires");

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
   const { phone, otp } = req.body;
   
       try {
           let user = await User.findOne({ phone });
   
           if (!user) {
               return res.status(400).json({ message: "User not found" });
           }
   
           // Check if OTP matches
           if (user.otp !== otp) {
               return res.status(400).json({ message: "Invalid OTP" });
           }
   
           // Mark user as verified
           user.verified = true;
           user.otp = null; // Remove OTP after successful verification
           await user.save();
   
           res.status(200).json({ message: "OTP verified successfully! Account is now active." });
       } catch (error) {
           console.error("Error verifying OTP:", error);
           res.status(500).json({ message: "Server error" });
       }
    };
    
    // resend otp
    
    // exports.spresendOtp = async (req, res) => {
    //     const phone = req.cookies.phone; 
    
    //     if (!phone) {
    //         return res.status(400).json({ message: "Session expired. Please register again." });
    //     }
    
    //     try {
    //         const user = await Service_Provider.findOne({ phone });
    
    //         if (!user) {
    //             return res.status(400).json({ message: "User not found. Please register first." });
    //         }
    
    //         if (user.isVerified) {
    //             return res.status(400).json({ message: "Account already verified. No need to resend OTP." });
    //         }
    
    //         const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    //         user.otp = newOtp;
    //         user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); 
    
    //         await user.save();
    //         const otpSent = await sendOtp(phone, newOtp);
    
    //         if (!otpSent) return res.status(500).json({ message: 'Failed to send OTP. Try again later.' });
    
    //         res.status(200).json({ message: "New OTP sent successfully." });
    
    //     } catch (error) {
    //         res.status(500).json({ message: "Error resending OTP.", error: error.message });
    //     }
    // };
    
    