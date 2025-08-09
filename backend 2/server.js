require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./src/routes/auth');
const postRoutes = require('./src/routes/posts');
const researchRoutes = require('./src/routes/research');
const pharmaRoutes = require('./src/routes/pharma');
const chatRoutes = require('./src/routes/chat');
const adminRoutes = require('./src/routes/admin');
const adsRoutes = require('./src/routes/ads');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL?.split(',') || '*' }));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/pharma', pharmaRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ads', adsRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {})
  .then(()=>{
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log('Server running on', PORT));
  })
  .catch(err=>{ console.error('Mongo error', err); process.exit(1); });
