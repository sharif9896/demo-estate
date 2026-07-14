const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, default: 'Property Consultant' },
    agency: { type: String, default: 'Almas Estates' },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    bio: { type: String },
    photo: { type: String },
    languages: [{ type: String }],
    yearsExperience: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Agent', AgentSchema);
