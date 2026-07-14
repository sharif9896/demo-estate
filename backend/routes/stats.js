const express = require('express');
const Property = require('../models/Property');
const Agent = require('../models/Agent');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/stats  (admin dashboard summary)
router.get('/', protect, async (req, res) => {
  try {
    const [totalListings, forSale, forRent, totalAgents, featured] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ purpose: 'buy' }),
      Property.countDocuments({ purpose: 'rent' }),
      Agent.countDocuments(),
      Property.countDocuments({ isFeatured: true }),
    ]);
    const mostViewed = await Property.find().sort('-views').limit(5).select('title views slug');
    res.json({ totalListings, forSale, forRent, totalAgents, featured, mostViewed });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
