const { Router } = require('express');
const {
    validateNewUser,
    validateLoginUser,
} = require('../middlewares/UserMiddleware');
const {
    postRegisterUser,
    postLoginUser,
    postLogOutUser,
    verifyToken
} 
= require('../controllers/authController');
const authRouter = Router();
authRouter.post('/register', validateNewUser, postRegisterUser);
authRouter.post('/login', validateLoginUser, postLoginUser);
authRouter.post('/logout', postLogOutUser);
authRouter.post('/verify-token', verifyToken);

module.exports = authRouter;
