const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: String,
  codeHash: String,
  expiresAt: Date
}, { timestamps: true });

module.exports = mongoose.model('OTP', otpSchema);
