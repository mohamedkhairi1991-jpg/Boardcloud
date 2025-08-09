const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const User = require('../models/User');
const Pharma = require('../models/PharmaCompany');
const Research = require('../models/Research');
const Ad = require('../models/Ad');

const router = express.Router();
router.use(auth);
router.use(requireRole(['admin']));

router.get('/pending-users', async (req,res)=>{
  const users = await User.find({ approved:false });
  res.json(users);
});
router.post('/approve-user/:id', async (req,res)=>{
  const u = await User.findById(req.params.id);
  if(!u) return res.status(404).json({ message:'Not found' });
  u.approved = true;
  await u.save();
  res.json({ message:'Approved' });
});

router.get('/pharma/pending', async (req,res)=>{
  const list = await Pharma.find({ approved:false });
  res.json(list);
});
router.post('/pharma/approve/:id', async (req,res)=>{
  const p = await Pharma.findById(req.params.id);
  if(!p) return res.status(404).json({ message:'Not found' });
  p.approved = true;
  await p.save();
  res.json({ message:'Approved' });
});

router.get('/research/pending', async (req,res)=>{
  const list = await Research.find({ approved:false }).populate('author','name');
  res.json(list);
});
router.post('/research/approve/:id', async (req,res)=>{
  const r = await Research.findById(req.params.id);
  if(!r) return res.status(404).json({ message:'Not found' });
  r.approved = true;
  await r.save();
  res.json({ message:'Approved' });
});

router.post('/ads/create', async (req,res)=>{
  const ad = new Ad(req.body);
  await ad.save();
  res.json(ad);
});
router.get('/ads/all', async (req,res)=>{
  const ads = await Ad.find().sort({ createdAt:-1 });
  res.json(ads);
});

module.exports = router;
