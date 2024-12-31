const express = require('express');
const userRouter = express.Router();
const {handleUserRegister, handleUserLogin} = require('../controllers/userController.js')

userRouter.post('/register', handleUserRegister)
userRouter.post('/login', handleUserLogin)


module.exports = userRouter