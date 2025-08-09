const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  title: String,
  specialty: String,
  abstract: String,
  fileUrl: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Research', researchSchema);
