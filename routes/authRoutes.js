// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
// Import both signup and signin from the controller
const { signup, signin } = require('../controllers/authController');

// Define the signup route
router.post('/signup', signup);

// Define the signin route
router.post('/signin', signin); // <-- ADD THIS LINE

module.exports = router;