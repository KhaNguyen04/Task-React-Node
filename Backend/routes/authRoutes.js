const { Router } = require('express');
const {
    validateNewUser,
    validateLoginUser,
} = require('../middlewares/UserMiddleware');
const {
    postRegisterUser,
    postLoginUser} 
= require('../controllers/authController');
const authRouter = Router();
authRouter.post('/register', validateNewUser, postRegisterUser);
authRouter.post('/login', validateLoginUser, postLoginUser);
module.exports = authRouter;
