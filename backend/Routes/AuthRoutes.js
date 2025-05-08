const express = require('express');
const { registerUser, loginUser, getUserProfile, updateClientProfile, getActiveServiceProviders, bookServiceProvider, getServiceProviderBookings, getClientBookings,verifyOtp,resendOtp } = require('../Controller/ClientAuth');
const { registerServiceProvider, loginServiceProvider, getSpProfile, updateAvailability, getAvailability,updateBookingStatus, updateSpProfile, subscribtionPlan} = require('../Controller/ServiceProviderAuth');
const { authenticateToken } = require('../authMiddleware'); 

const { initiateSbPayment,verifySbPayment} = require('../Controller/subscriptionController');

const {initiatePayment,verifyPayment}=require('../Controller/paymentController');
const { 
    generateOTP, 
    verifyOTP, 
    completion,
    markFeedback 
} = require('../Controller/bookingController');
const { sendEmail } = require('../Controller/sendEmail');
// const {
//     generateWeeklyPayouts,
//     processPayout,
//     getAllPayouts
//   } = require('../controllers/payoutController');

const router = express.Router();

router.post('/clSignup', registerUser);
router.post('/clLogin', loginUser);
router.get('/clProfile', authenticateToken, getUserProfile);
router.post('/verify-otp', verifyOtp); // for otp verification (client side)
router.post('/resend-otp', resendOtp);

// service booking
router.put('/profile', authenticateToken, updateClientProfile);     // for updating client profile to add (service and service location)
router.get('/service-providers', authenticateToken, getActiveServiceProviders);   // for getting all available service provider for this location
router.post('/book', authenticateToken, bookServiceProvider);    // for booking request (provide service provider id and service location)
router.get('/client/bookings', authenticateToken, getClientBookings);    // for checking booked service provider details (client end)

router.get('/bookings', authenticateToken, getServiceProviderBookings); // for check details of client that book service provider (service provider end checking)
router.put('/bookings/:bookingId/status', authenticateToken, updateBookingStatus); // for change the booking status (sevice provider side - (status - confirmed or reject))


router.post('/spSignup', registerServiceProvider);
router.post('/spLogin', loginServiceProvider);
router.get('/spProfile', authenticateToken, getSpProfile);
router.patch('/updateSpProfile', authenticateToken,updateSpProfile);


router.patch("/availability", authenticateToken, updateAvailability); // for changing the availability of service provider (isAvailable, servicePincode)
router.get("/getavailability", authenticateToken, getActiveServiceProviders); // check the available service provider (client side)

// Payment routes
router.post('/bookings/:bookingId/pay', authenticateToken, initiatePayment);
router.post('/payments/verify', verifyPayment);
router.post('/sendemail',sendEmail);

// OTP and completion routes
router.post('/bookings/:bookingId/otp', authenticateToken, generateOTP);
router.post('/bookings/:bookingId/verify-otp', authenticateToken, verifyOTP);
router.post('/bookings/:bookingId/feedback', authenticateToken, markFeedback);
router.put('/bookings/:bookingId/complete', authenticateToken, completion);

// for service provider subscription

router.post('/subscribe/initiate', authenticateToken, initiateSbPayment);
router.post('/subscribe/verify', verifySbPayment);


/// weekly payout
// router.post('/generate-weekly', generateWeeklyPayouts);
// router.post('/process/:payoutId', processPayout);
// router.get('/all', getAllPayouts);

module.exports = router;

