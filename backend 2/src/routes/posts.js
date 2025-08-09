const express = require('express');
const sanitize = require('sanitize-html');
const { auth } = require('../middleware/auth');
const Post = require('../models/Post');

const router = express.Router();

router.post('/', auth, async (req,res)=>{
  if(!req.user.approved) return res.status(403).json({ message:'Account not approved' });
  const sponsored = !!req.body.sponsored && req.user.role === 'pharma';
  const post = new Post({
    author: req.user._id,
    title: sanitize(req.body.title || ''),
    body: sanitize(req.body.body || ''),
    specialty: sanitize(req.body.specialty || ''),
    sponsored
  });
  await post.save();
  res.json(post);
});

router.get('/', auth, async (req,res)=>{
  const filter = {};
  if(req.query.specialty) filter.specialty = req.query.specialty;
  const posts = await Post.find(filter).populate('author','name role').sort({ createdAt:-1 }).limit(300);
  res.json(posts);
});

router.post('/:id/comments', auth, async (req,res)=>{
  const post = await Post.findById(req.params.id);
  if(!post) return res.status(404).json({ message:'Not found' });
  post.comments.push({ author:req.user._id, body:sanitize(req.body.body || '') });
  await post.save();
  res.json(post);
});

module.exports = router;
