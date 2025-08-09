const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: String,
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatSchema);
