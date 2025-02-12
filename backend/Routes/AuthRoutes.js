const express = require('express');
const { registerUser, loginUser, verifyOtp, getUserProfile,resendOtp } = require('../Controller/ClientAuth');
const { registerServiceProvider, loginServiceProvider,spverifyOtp, getSpProfile, spresendOtp } = require('../Controller/ServiceProviderAuth');
const { authenticateToken } = require('../authMiddleware'); 
const router = express.Router();

router.post('/clSignup', registerUser);
router.post('/clLogin', loginUser);
router.get('/clProfile', authenticateToken, getUserProfile);
router.post('/clVerifyOtp', verifyOtp); // OTP verification route
router.post('/clresendotp',resendOtp);


router.post('/spSignup', registerServiceProvider);
router.post('/spLogin', loginServiceProvider);
router.get('/spProfile', authenticateToken, getSpProfile);
router.post('/spVerifyOtp', spverifyOtp); 
router.post('/spresendotp',spresendOtp);
module.exports = router;

