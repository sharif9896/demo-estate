const express = require('express');
const Page = require('../models/Page');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/pages/:key  (public) - returns editable content for a static page
router.get('/:key', async (req, res) => {
  try {
    let page = await Page.findOne({ key: req.params.key });
    if (!page) page = await Page.create({ key: req.params.key, content: {} });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/pages/:key  (admin only) - upsert editable content
router.put('/:key', protect, async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { key: req.params.key },
      { key: req.params.key, title: req.body.title, content: req.body.content },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
