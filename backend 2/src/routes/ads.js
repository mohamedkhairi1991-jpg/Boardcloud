const express = require('express');
const Ad = require('../models/Ad');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req,res)=>{
  const now = new Date();
  const filter = { approved:true, startAt:{ $lte: now }, endAt:{ $gte: now } };
  if(req.query.targetSpecialty) filter.targetSpecialty = req.query.targetSpecialty;
  const ads = await Ad.find(filter).sort({ createdAt:-1 }).limit(20);
  res.json(ads);
});

module.exports = router;
