// server/controllers/authController.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // CORRECTED: This now properly requires the library

// SIGN UP LOGIC
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: 'User created successfully!',
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    // This will now catch any errors during the process
    console.error('SIGNUP ERROR:', error); 
    res.status(500).json({ message: 'Server error during signup.', error: error.message });
  }
};

// SIGN IN LOGIC
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({
      message: 'Logged in successfully!',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('SIGNIN ERROR:', error);
    res.status(500).json({ message: 'Server error during signin.', error: error.message });
  }
};