const userModel = require('../Models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const handleUserRegister = async(req, res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            message: 'username and passsword required'
        })
    }

    try{
        const duplicateUser = await userModel.findOne({username: username});

        if(duplicateUser){
            return res.status(400).json('user already existed')
        }


        const hashedPassword = bcrypt.hashSync(password, 10);


        const newUser = new userModel({
            username: username,
            password: hashedPassword
        })

        await newUser.save();

        return res.status(201).json({
            message: 'Successfully create an account'
        })

    }catch(err){
        return res.status(500).json({
            message: 'server side error',
            error: err
        })
    }
}


const handleUserLogin = async(req, res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            message: 'username and passsword required'
        })
    }

    try{
        const duplicateUser = await userModel.findOne({username: username})
        if(!duplicateUser){
            return res.status(400).json('user does not existed')
        }


        const passwordMatch = bcrypt.compareSync(password, duplicateUser.password)

        if(!passwordMatch){
            return res.status(400).json('password does not match')
        }

        const userToken = jwt.sign({
            id: duplicateUser._id,
            username: username,
        }, process.env.JWT_SECRET, {
            expiresIn: '3h'
        })

        res.cookie('token', userToken, {
            maxAge: 3600000,
            sameSite: 'strict',
            httpOnly: true
        })

        return res.status(201).json({
            message: 'Successfully login'
        })

    }catch(err){
        return res.status(500).json({
            message: 'server side error',
            error: err
        })
    }
}



module.exports = {
    handleUserRegister,
    handleUserLogin,
}