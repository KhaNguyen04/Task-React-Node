const { Router } = require('express');
const {
    validateNewUser,
    validateLoginUser,
} = require('../middlewares/UserMiddleware');
const {
    postRegisterUser,
    postLoginUser,
    postLogOutUser
} 
= require('../controllers/authController');
const authRouter = Router();
authRouter.post('/register', validateNewUser, postRegisterUser);
authRouter.post('/login', validateLoginUser, postLoginUser);
authRouter.post('/logout', postLogOutUser);

module.exports = authRouter;
