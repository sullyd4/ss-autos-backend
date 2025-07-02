// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes'); // <-- IMPORT HERE

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'https://helpful-caramel-6cb159.netlify.app', // Your Netlify app's URL
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json());

// Use Routes
app.use('/api/auth', authRoutes); // <-- USE THE ROUTES HERE

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('S&S Autos API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});