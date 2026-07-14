const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Property = require('../models/Property');
const { protectUser } = require('../middleware/userAuthMiddleware');

const router = express.Router();

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }
    const user = await User.create({ name, email: email.toLowerCase(), password, phone });
    res.status(201).json({
      token: genToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      token: genToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/me
router.get('/me', protectUser, (req, res) => {
  res.json(req.user);
});

// GET /api/users/saved  (list saved/favorited properties)
router.get('/saved', protectUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'savedProperties',
      populate: { path: 'agent' },
    });
    res.json(user.savedProperties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/saved/:propertyId  (toggle save/unsave)
router.post('/saved/:propertyId', protectUser, async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    const user = await User.findById(req.user._id);
    const idx = user.savedProperties.findIndex((id) => id.toString() === req.params.propertyId);
    let saved;
    if (idx > -1) {
      user.savedProperties.splice(idx, 1);
      saved = false;
    } else {
      user.savedProperties.push(property._id);
      saved = true;
    }
    await user.save();
    res.json({ saved, savedProperties: user.savedProperties });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
