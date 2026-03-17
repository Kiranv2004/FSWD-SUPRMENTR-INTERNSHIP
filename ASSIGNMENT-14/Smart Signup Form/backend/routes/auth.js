const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || fullName.trim().length < 3) {
      return res.status(400).json({ message: 'Full name must be at least 3 characters.' });
    }

    if (!emailRegex.test(email || '')) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    if (!passwordRegex.test(password || '')) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Confirm password must match password.' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName: fullName.trim(), email, passwordHash });

    return res.status(201).json({
      message: 'Signup successful. Verification email simulation sent.',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        emailVerified: user.emailVerified
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
