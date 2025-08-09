const express = require('express');
const sanitize = require('sanitize-html');
const { auth } = require('../middleware/auth');
const ChatMessage = require('../models/ChatMessage');

const router = express.Router();

router.post('/send', auth, async (req,res)=>{
  const msg = await ChatMessage.create({ from:req.user._id, to:req.body.to, body:sanitize(req.body.body || '') });
  res.json(msg);
});

router.get('/thread/:userId', auth, async (req,res)=>{
  const other = req.params.userId;
  const msgs = await ChatMessage.find({ $or: [{ from:req.user._id, to:other }, { from:other, to:req.user._id }] }).sort({ createdAt:1 });
  res.json(msgs);
});

module.exports = router;
