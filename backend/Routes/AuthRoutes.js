const express = require('express');
const { registerUser, loginUser, getUserProfile, updateClientProfile, getActiveServiceProviders, bookServiceProvider, getServiceProviderBookings, getClientBookings,verifyOtp,resendOtp } = require('../Controller/ClientAuth');
const { registerServiceProvider, loginServiceProvider, getSpProfile, updateAvailability, getAvailability,updateBookingStatus, updateSpProfile} = require('../Controller/ServiceProviderAuth');
const { authenticateToken } = require('../authMiddleware'); 
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
router.get("/getavailability", authenticateToken, getAvailability); // check the available service provider (client side)
module.exports = router;

