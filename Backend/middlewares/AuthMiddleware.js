const jwt = require('jsonwebtoken');
const validator = require('validator');


const validateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || validator.isEmpty(token)) {
      return res.status(401).json({
        message: 'No token provided',
      });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = {
            id: decoded.id,
            username: decoded.username,
          };        
          next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = validateJWT;
