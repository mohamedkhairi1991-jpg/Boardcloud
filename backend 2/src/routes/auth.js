const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sanitize = require('sanitize-html');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { sendOTP } = require('../services/emailService');

const router = express.Router();

function genCode(){ return Math.floor(100000 + Math.random()*900000).toString(); }

router.post('/request-otp', async (req,res)=>{
  const email = sanitize((req.body.email || '').toLowerCase());
  if(!email) return res.status(400).json({ message:'Email required' });
  const code = genCode();
  const codeHash = crypto.createHash('sha256').update(code).digest('hex');
  const expiresAt = new Date(Date.now() + 10*60*1000);
  await OTP.findOneAndDelete({ email });
  await OTP.create({ email, codeHash, expiresAt });
  await sendOTP(email, code);
  res.json({ message:'OTP sent' });
});

router.post('/verify-otp-register', async (req,res)=>{
  const { email, code, name, password, role, specialties, phone } = req.body;
  const otp = await OTP.findOne({ email });
  if(!otp) return res.status(400).json({ message:'No OTP requested' });
  if(new Date() > otp.expiresAt){ await OTP.deleteOne({ _id: otp._id }); return res.status(400).json({ message:'OTP expired' }); }
  const codeHash = crypto.createHash('sha256').update(code).digest('hex');
  if(codeHash !== otp.codeHash) return res.status(400).json({ message:'Invalid OTP' });
  await OTP.deleteOne({ _id: otp._id });
  if(await User.findOne({ email })) return res.status(400).json({ message:'Email exists' });
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const u = new User({ name, email, phone, passwordHash, role, specialties, verifiedEmail:true, approved:false });
  await u.save();
  const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn:'7d' });
  res.json({ token, user:{ id:u._id, name:u.name, email:u.email, role:u.role, approved:u.approved } });
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ message:'Invalid credentials' });
  const match = await bcrypt.compare(password, user.passwordHash || '');
  if(!match) return res.status(400).json({ message:'Invalid credentials' });
  const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn:'7d' });
  res.json({ token, user:{ id:user._id, name:user.name, email:user.email, role:user.role, approved:user.approved } });
});

module.exports = router;
