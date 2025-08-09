const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  passwordHash: String,
  role: { type: String, enum: ['student','mentor','pharma','admin'], default: 'student' },
  specialties: [String],
  verifiedEmail: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  shareWhatsApp: { type: Boolean, default: false },
  whatsappNumber: String,
  notificationPrefs: {
    app: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
    whatsapp: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
