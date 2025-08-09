const express = require('express');
const multer = require('multer');
const sanitize = require('sanitize-html');
const { auth } = require('../middleware/auth');
const Research = require('../models/Research');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', auth, upload.single('file'), async (req,res)=>{
  if(!req.user.approved) return res.status(403).json({ message:'Account not approved' });
  const r = new Research({
    title: sanitize(req.body.title || ''),
    specialty: sanitize(req.body.specialty || ''),
    abstract: sanitize(req.body.abstract || ''),
    fileUrl: req.file ? `/uploads/${req.file.filename}` : '',
    author: req.user._id,
    approved: false
  });
  await r.save();
  res.json({ message:'Research uploaded, awaiting admin approval' });
});

router.get('/', auth, async (req,res)=>{
  const filter = { approved:true };
  if(req.query.specialty) filter.specialty = req.query.specialty;
  const list = await Research.find(filter).populate('author','name').sort({ createdAt:-1 }).limit(200);
  res.json(list);
});

module.exports = router;
