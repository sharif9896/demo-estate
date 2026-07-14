const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email?.toLowerCase() });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      token: genToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/signup
// Gated by an invite code (ADMIN_SIGNUP_CODE in .env) so random visitors can't
// create themselves an admin account. Share the code only with people you
// want to have admin access. New signups always get the 'editor' role —
// only an existing superadmin can promote someone via the database directly.
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, signupCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }
    if (!process.env.ADMIN_SIGNUP_CODE || signupCode !== process.env.ADMIN_SIGNUP_CODE) {
      return res.status(403).json({ message: 'Invalid signup code' });
    }

    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const admin = await Admin.create({ name, email: email.toLowerCase(), password, role: 'editor' });

    res.status(201).json({
      token: genToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
  res.json(req.admin);
});

module.exports = router;