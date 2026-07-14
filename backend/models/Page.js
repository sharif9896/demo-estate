const mongoose = require('mongoose');

// Generic editable content block for static pages (About, Contact, Home hero copy, etc.)
// Lets the admin edit site copy without a redeploy.
const PageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. 'home', 'about', 'contact'
    title: { type: String },
    content: { type: mongoose.Schema.Types.Mixed, default: {} }, // flexible JSON blob per page
  },
  { timestamps: true }
);

module.exports = mongoose.model('Page', PageSchema);
