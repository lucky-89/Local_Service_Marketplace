const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../Controller/ClientAuth');
const { registerServiceProvider, loginServiceProvider, getSpProfile, updateAvailability, getAvailability} = require('../Controller/ServiceProviderAuth');
const { authenticateToken } = require('../authMiddleware'); 
const router = express.Router();

router.post('/clSignup', registerUser);
router.post('/clLogin', loginUser);
router.get('/clProfile', authenticateToken, getUserProfile);


router.post('/spSignup', registerServiceProvider);
router.post('/spLogin', loginServiceProvider);
router.get('/spProfile', authenticateToken, getSpProfile);

// service provider availability 


router.patch("/availability", authenticateToken, updateAvailability);
router.get("/getavailability", authenticateToken, getAvailability);
module.exports = router;

