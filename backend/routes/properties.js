const express = require('express');
const Property = require('../models/Property');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// GET /api/properties  (public, with filters + pagination)
router.get('/', async (req, res) => {
  try {
    const {
      purpose, propertyType, city, minPrice, maxPrice,
      bedrooms, q, featured, page = 1, limit = 12, sort = '-createdAt',
    } = req.query;

    const filter = {};
    if (purpose) filter.purpose = purpose;
    if (propertyType) filter.propertyType = propertyType;
    if (city) filter.city = new RegExp(city, 'i');
    if (bedrooms) filter.bedrooms = { $gte: Number(bedrooms) };
    if (featured) filter.isFeatured = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (q) {
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { neighborhood: new RegExp(q, 'i') },
        { city: new RegExp(q, 'i') },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Property.find(filter).populate('agent').sort(sort).skip(skip).limit(Number(limit)),
      Property.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/properties/:slug  (public)
router.get('/:slug', async (req, res) => {
  try {
    const property = await Property.findOne({ slug: req.params.slug }).populate('agent');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    property.views += 1;
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/properties  (admin only)
router.post('/', protect, async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/properties/:id  (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/properties/:id  (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/properties/upload  (admin only, image upload)
router.post('/upload/image', protect, upload.array('images', 10), (req, res) => {
  const paths = req.files.map((f) => `/uploads/${f.filename}`);
  res.json({ paths });
});

module.exports = router;
