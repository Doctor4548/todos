const express = require('express');
const userRouter = express.Router();
const {handleUserRegister, handleUserLogin, handleCheckAuth, handleUserLogout} = require('../controllers/userController.js')

userRouter.post('/register', handleUserRegister)
userRouter.post('/login', handleUserLogin)
userRouter.get('/checkAuth', handleCheckAuth)
userRouter.delete('/logout', handleUserLogout)

module.exports = userRouter