const argon2 = require('argon2');
const User = require('../models/User');
const generateToken = require('../utils/generateToken'); 
const jwt = require('jsonwebtoken');

const postRegisterUser = async (req, res) => {
  const { username,  password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Username  already taken!',
      });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id, newUser.username);

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
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const userObj = user.toObject();
      delete userObj.password;      
      const token = generateToken(user._id, user.username);
      res.status(201).json({ user:userObj, token });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred during login', error });
    }
};

const postLogOutUser = async (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
}

const verifyToken = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    res.status(200).json({ message: 'Token is valid' });
  });
};

module.exports = {     
    postRegisterUser,
    postLoginUser,
    postLogOutUser,  
    verifyToken,

};
