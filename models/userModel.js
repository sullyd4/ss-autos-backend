// server/models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { // <-- ADD THIS ENTIRE BLOCK
    type: String,
    enum: ['user', 'admin'], // The role can only be one of these two values
    default: 'user',        // New users will be 'user' by default
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;