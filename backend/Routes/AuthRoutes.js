const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../Controller/ClientAuth');
const { registerServiceProvider, loginServiceProvider, getSpProfile} = require('../Controller/ServiceProviderAuth');
const { authenticateToken } = require('../authMiddleware'); 
const router = express.Router();

router.post('/clSignup', registerUser);
router.post('/clLogin', loginUser);
router.get('/clProfile', authenticateToken, getUserProfile);
// router.post('/clresendotp',resendOtp);


router.post('/spSignup', registerServiceProvider);
router.post('/spLogin', loginServiceProvider);
router.get('/spProfile', authenticateToken, getSpProfile);
// router.post('/spresendotp',spresendOtp);
module.exports = router;

