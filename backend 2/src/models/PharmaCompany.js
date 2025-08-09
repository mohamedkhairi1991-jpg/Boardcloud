const mongoose = require('mongoose');

const medSchema = new mongoose.Schema({
  name: String,
  description: String,
  availability: String
});

const categorySchema = new mongoose.Schema({
  name: String,
  meds: [medSchema]
});

const pharmaSchema = new mongoose.Schema({
  name: String,
  description: String,
  contactEmail: String,
  approved: { type: Boolean, default: false },
  subdivisions: [categorySchema],
  conferences: [{
    title: String,
    date: Date,
    location: String,
    description: String,
    attachments: [String]
  }]
}, { timestamps: true });

module.exports = mongoose.model('PharmaCompany', pharmaSchema);
