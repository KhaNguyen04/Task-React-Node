require('dotenv').config();
const authRouter = require('./routes/authRoutes');
const todoRouter = require('./routes/todoRoutes');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Middleware setup
app.use(
    cors({
      origin: ['http://localhost:5173'], 
    }),
  );
  
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));


app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

app.all('*', (_req, res) => {
    return res.status(404).json({ message: '404 Page Not Found' });
});
module.exports = app;
