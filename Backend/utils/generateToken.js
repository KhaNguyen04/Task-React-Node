const jwt = require('jsonwebtoken');

const generateToken = (id, username) => {
  try {
    const token = jwt.sign(
      { id, username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      },
    );
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

module.exports = generateToken;
