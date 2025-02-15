const validator = require('validator');

const validateNewUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username ||!password ) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ message: 'Username must be alphanumeric!' });
  }

  if (!validator.isLength(username, { min: 3, max: 15 })) {
    return res
      .status(400)
      .json({ message: 'Username must be between 3 and 15 characters!' });
  }


  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      message:
        'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and symbols.',
    });
  }

  req.body.username = validator.escape(username);
  req.body.password = validator.escape(password);

  next();
};

const validateLoginUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username ||!password ) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ message: 'Username must be alphanumeric!' });
  }

  req.body.username = validator.escape(username);
  req.body.password = validator.escape(password);

  next();
};

module.exports = { validateNewUser, validateLoginUser };
