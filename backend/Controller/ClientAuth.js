const User = require('../Model/ClientModel');
const OTP = require('../Model/OTPModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');



const ServiceProvider=require("../Model/Service_ProviderModel")

exports.registerUser = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        if (!name || !phone || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            phone,
            email,
            password: hashedPassword,
            isVerified: false
        });

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: {
                email: process.env.SENDER_EMAIL,
                name: "Local Service Markateplace"
            },
            subject: 'Email Verification OTP',
            html: `<h1>Your OTP: ${otp}</h1><p>Valid for 5 minutes</p>`
        };

        await sgMail.send(msg);
        await OTP.create({ email, otp });

        res.status(201).json({
            message: "OTP sent to email",
            userId: newUser._id
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// OTP Verification
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
        if (!otpRecord || otpRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { isVerified: true },
            { new: true }
        );

        await OTP.deleteMany({ email });

        res.status(200).json({
            message: "Email verified successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Verification failed", error: error.message });
    }
};

// Resend OTP
exports.resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Account already verified" });
        }
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

        await OTP.deleteMany({ email });

        await OTP.create({ email, otp: newOtp });

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: {
                email: process.env.SENDER_EMAIL,
                name: "Local Service Marketplace"
            },
            subject: 'New Verification OTP',
            html: `<h1>Your New OTP: ${newOtp}</h1><p>Valid for 5 minutes</p>`
        };

        await sgMail.send(msg);

        res.status(200).json({ 
            message: "New OTP sent successfully",
            email: email
        });

    } catch (error) {
        console.error("Resend OTP error:", error);
        res.status(500).json({ message: "Failed to resend OTP", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
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
        if (!user.isVerified) {
            return res.status(403).json({ message: "Account not verified. Please check your email." });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login Successful", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: "Account not verified. Please check your email." });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};



exports.updateClientProfile = async (req, res) => {
    try {
        const { category, servicePinCode } = req.body;
        const client = await User.findById(req.user.id);

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        if (!client.isVerified) {
            return res.status(403).json({ message: "Account not verified. Please check your email." });
        }

        client.category = category;
        client.servicePinCode = servicePinCode;
        await client.save();

        res.status(200).json({ message: "Client profile updated successfully", client });
    } catch (error) {
        res.status(500).json({ message: "Error updating client profile", error: error.message });
    }
};

// Get active service providers based on category and pincode
exports.getActiveServiceProviders = async (req, res) => {
    try {
        const client = await User.findById(req.user.id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        if (!client.isVerified) {
            return res.status(403).json({ message: "Account not verified. Please check your email." });
        }

        const { category, servicePinCode } = client;
        const serviceProviders = await ServiceProvider.find({
            category,
            servicePinCodes: servicePinCode,
            isAvailable: true
        }).select("-password");

        res.status(200).json({ serviceProviders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching service providers", error: error.message });
    }
};

// Book a service provider
exports.bookServiceProvider = async (req, res) => {
    try {
        const { serviceProviderId, serviceLocation } = req.body;
        const client = await User.findById(req.user.id);
        const serviceProvider = await ServiceProvider.findById(serviceProviderId);

        if (!client || !serviceProvider) {
            return res.status(404).json({ message: "Client or Service Provider not found" });
        }

        const booking = {
            serviceProviderId: serviceProvider._id,
            serviceProviderName: serviceProvider.name,
            serviceProviderPhone: serviceProvider.phone,
            serviceProviderEmail: serviceProvider.email,
            serviceLocation,
            status: 'Pending'
        };

        client.bookings.push(booking);
        await client.save();

        sgMail.setApiKey(process.env.SENDGRID_API_KEY1);
        const msg = {
            to: serviceProvider.email,
            from: {
                email: process.env.SENDER_EMAIL1,
                name: "Local Service Markateplace"
            },
            subject: 'Booking Confirmation',
            html: `<h1>You are booked by Name:${client.name}</h1><p>Email:${client.email}</p><p>Mobile no: ${client.phone}</p><p>Service Location:${booking.serviceLocation}</p><p>Please Confirm the booking</p>`
        };

        await sgMail.send(msg);

        res.status(200).json({ message: "Service Provider booked successfully", booking });

    } catch (error) {
        res.status(500).json({ message: "Error booking service provider", error: error.message });
    }
};

// Get client bookings
// Get bookings for a service provider
exports.getServiceProviderBookings = async (req, res) => {
    try {
      const serviceProviderId = req.user.id; 
  
      const clients = await User.find({
        "bookings.serviceProviderId": serviceProviderId,
      }).select("bookings name phone email");
  
      const bookings = clients.flatMap((client) =>
        client.bookings
          .filter(
            (booking) =>
              booking.serviceProviderId.toString() === serviceProviderId
          )
          .map((booking) => ({
            bookingId:booking._id,
            clientName: client.name,
            clientPhone: client.phone,
            clientEmail:client.email,
            serviceLocation: booking.serviceLocation,
            status: booking.status,
            bookingDate: booking.serviceDate,
          }))
      );
  
      res.status(200).json({ bookings });
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
  };

  exports.getClientBookings = async (req, res) => {
    try {
        const client = await User.findById(req.user.id).populate('bookings.serviceProviderId', 'name phone email');
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json({ bookings: client.bookings });
    } catch (error) {
        res.status(500).json({ message: "Error fetching client bookings", error: error.message });
    }
};