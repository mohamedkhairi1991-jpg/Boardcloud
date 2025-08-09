const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: String,
  company: String,
  imageUrl: String,
  link: String,
  targetSpecialty: String,
  startAt: Date,
  endAt: Date,
  frequency: { type: String, enum: ['always','session','sparse'], default: 'always' },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Ad', adSchema);
