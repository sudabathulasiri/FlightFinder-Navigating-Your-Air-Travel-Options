const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Adjust path if needed

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, dob, email, countryCode, phone, username, password } = req.body;
    if (!fullName || !dob || !email || !countryCode || !phone || !username || !password) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }
    // Check if user exists
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ message: 'Email or username already exists.' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = new User({
      fullName,
      dob,
      email,
      countryCode,
      phone,
      username,
      password: hashedPassword
    });
    await user.save();
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Please enter all fields.' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
    // Include role in JWT payload!
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to verify token
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Auth route working!' });
});

module.exports = router;

// In-memory store for demo (use DB in production)
const resetCodes = {};

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: 'If that email is registered, a code has been sent.' });
  }

  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetPasswordToken = code;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  // Send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'FlightFinder Password Reset Code',
    html: `<p>Your password reset code is: <b>${code}</b><br>This code is valid for 15 minutes.</p>`
  };

  await transporter.sendMail(mailOptions);

  res.json({ message: 'If that email is registered, a code has been sent.' });
});

router.post('/verify-reset-code', async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (
    !user ||
    user.resetPasswordToken !== code ||
    !user.resetPasswordExpires ||
    user.resetPasswordExpires < Date.now()
  ) {
    return res.status(400).json({ message: 'Invalid or expired code.' });
  }
  res.json({ message: 'Code verified.' });
});

// Reset password route
router.post('/reset-password', async (req, res) => {
  const { email, code, password: newPassword } = req.body;
  const user = await User.findOne({ email });
  if (
    !user ||
    user.resetPasswordToken !== code ||
    !user.resetPasswordExpires ||
    user.resetPasswordExpires < Date.now()
  ) {
    return res.status(400).json({ message: 'Invalid or expired code.' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Password has been reset successfully.' });
});

// Update user profile
router.put('/me', authMiddleware, async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user, updates, { new: true, select: '-password' });
  res.json(user);
});

module.exports.authMiddleware = authMiddleware;

