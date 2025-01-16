const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const User = require('../models/User');
const generateToken = require('../utils/generateToken'); // Assuming you have a token generation utility

// Function to register a new user
const postRegisterUser = async (req, res) => {
  const { username,  password } = req.body;

  try {
    // Check if the user already exists (username)
    const existingUser = await User.findOne({
      $or: [{ username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Username  already taken!',
      });
    }

    // Hash the password before saving it
    const hashedPassword = await argon2.hash(password);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token for the user
    const token = generateToken(newUser._id, newUser.username);

    // Send a success response with the token
    res.status(201).json({
      message: 'User registered successfully!',
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const postLoginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      // If user is not found, return an error
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Verify the password using argon2
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      // Generate a JWT token
      const token = generateToken(user._id, user.username);
  
      // Return the token to the client
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred during login', error });
    }
  };

module.exports = {     
    postRegisterUser,
    postLoginUser
};
