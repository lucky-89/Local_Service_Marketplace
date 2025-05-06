const User = require('../Model/Service_ProviderModel');
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Client=require('../Model/ClientModel');


const router = express.Router();

// Register a service provider

exports.registerServiceProvider = async (req, res) => {
    try {
        const { name, phone, email, password, category, price, profileImage, aadharImage, flag } = req.body;

     
        if (!name || !phone || !email || !password || !category || !price ) {
            return res.status(400).json({ message: "All fields are required" });
        }

   
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

            let isVerified=false;
            if(flag==1){
                isVerified=true;
                const newUser = new User({
                    name, phone, email, password:hashedPassword, category, price,
                    profileImage, aadharImage, isVerified
                });
    
                await newUser.save();
                res.status(201).json({ message: "User registered successfully", isVerified });
            }
            else{
                res.status(201).json({ message: "User registered unsuccessful please provide the same user profile image and adhar image", isVerified });
            }
            
      
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.loginServiceProvider = async (req, res) => {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
        return res.status(400).json({ message: "Either Email or Phone and Password are required" });
    }

    try {
        let user;
        
        if (email) {
            user = await User.findOne({ email });
        } else if (phone) {
            user = await User.findOne({ phone });
        }

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login Successful", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSpProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};

exports.updateSpProfile = async (req, res) => {
    try {
        const { name, phone, email, category, price, profileImage} = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (email) user.email = email;
        if (category) user.category = category;
        if (price) user.price = price;
        if (profileImage) user.profileImage = profileImage;

        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};

// for Availabilty of service provider

exports.updateAvailability = async (req, res) => {
    const { isAvailable, servicePinCodes } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // if(user.tokens<2){
        //     return res.status(404).json({ message: "You are not authorised for marked availability" });
        // }
        if (isAvailable) {
            if (!servicePinCodes || servicePinCodes.length === 0) {
                return res.status(400).json({ message: "Please provide at least one pincode" });
            }
            user.servicePinCodes = servicePinCodes;
        } else {
            user.servicePinCodes = [];
        }

        user.isAvailable = isAvailable;
        user.lastUpdated = Date.now(); 
        await user.save();

        res.status(200).json({ message: "Availability updated", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating availability", error: error.message });
    }
};


exports.getAvailability = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("isAvailable servicePinCodes");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ isAvailable: user.isAvailable, servicePinCodes: user.servicePinCodes });
    } catch (error) {
        res.status(500).json({ message: "Error fetching availability", error: error.message });
    }
};


exports.updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const serviceProviderId = req.user.id;

       
        const validStatuses = ['Pending', 'Confirmed', 'Completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const result = await Client.findOneAndUpdate(
            {
                "bookings._id": bookingId,
                "bookings.serviceProviderId": serviceProviderId
            },
            {
                $set: { "bookings.$.status": status }
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: 'Booking not found or unauthorized' });
        }

        res.status(200).json({ message: 'Booking status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking status', error: error.message });
    }
};