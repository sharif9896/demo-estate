const mongoose = require('mongoose');
const slugify = require('slugify');

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    purpose: { type: String, enum: ['buy', 'rent'], required: true },
    propertyType: {
      type: String,
      enum: ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Office', 'Land', 'Studio'],
      required: true,
    },
    price: { type: Number, required: true },
    priceFrequency: { type: String, enum: ['total', 'yearly', 'monthly'], default: 'total' },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    areaSqft: { type: Number, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    address: { type: String },
    description: { type: String, required: true },
    amenities: [{ type: String }],
    images: [{ type: String }],
    coverImage: { type: String },
    isFeatured: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
    status: { type: String, enum: ['available', 'pending', 'sold', 'rented'], default: 'available' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    reference: { type: String, unique: true },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PropertySchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(`${this.title}-${Date.now()}`, { lower: true, strict: true });
  }
  if (!this.reference) {
    this.reference = 'AE-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Property', PropertySchema);
