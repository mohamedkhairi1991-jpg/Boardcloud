const express = require('express');
const sanitize = require('sanitize-html');
const { auth } = require('../middleware/auth');
const Pharma = require('../models/PharmaCompany');

const router = express.Router();

router.get('/', auth, async (req,res)=>{
  const list = await Pharma.find({ approved:true });
  res.json(list);
});

router.get('/:id', auth, async (req,res)=>{
  const c = await Pharma.findById(req.params.id);
  if(!c) return res.status(404).json({ message:'Not found' });
  res.json(c);
});

router.post('/request', auth, async (req,res)=>{
  const name = sanitize(req.body.name || '');
  const contactEmail = sanitize(req.body.contactEmail || '');
  const p = new Pharma({ name, contactEmail, approved:false });
  await p.save();
  res.json({ message:'Request sent to admin' });
});

module.exports = router;
