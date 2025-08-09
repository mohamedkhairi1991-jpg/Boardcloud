const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  body: String,
  specialty: String,
  sponsored: { type: Boolean, default: false },
  comments: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
