require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');

(async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('Set MONGO_URI in .env');
    await mongoose.connect(process.env.MONGO_URI);
    const password = process.env.ADMIN_INIT_PASSWORD || 'ChangeMe123!';
    const passwordHash = await bcrypt.hash(password, 10);
    const u = new User({
      name: 'Admin',
      email: process.env.ADMIN_INIT_EMAIL || 'admin@boardcloud.local',
      passwordHash,
      role: 'admin',
      verifiedEmail: true,
      approved: true
    });
    await u.save();
    console.log('Admin created:', u.email, 'password:', password);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
