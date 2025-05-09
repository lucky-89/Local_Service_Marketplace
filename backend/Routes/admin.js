// routes/admin.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }


  const token = jwt.sign({ email: ADMIN_EMAIL}, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(200).json({ message: 'Login successful', token });
});

module.exports = router;

