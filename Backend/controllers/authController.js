const argon2 = require('argon2');
const User = require('../models/User');
const generateToken = require('../utils/generateToken'); 

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
module.exports = {     
    postRegisterUser,
    postLoginUser,
    postLogOutUser
};
