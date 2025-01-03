const userModel = require('../Models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const handleUserRegister = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'username and passsword required'
        })
    }

    try {
        const duplicateUser = await userModel.findOne({ username: username });

        if (duplicateUser) {
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

    } catch (err) {
        return res.status(500).json({
            message: 'server side error',
            error: err
        })
    }
}


const handleUserLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'username and passsword required'
        })
    }

    try {
        const duplicateUser = await userModel.findOne({ username: username })


        if(!duplicateUser){
            return res.status(400).json('password or username does not match')
        }

        const passwordMatch = bcrypt.compareSync(password, duplicateUser.password)


        if (! duplicateUser || !passwordMatch) {
            return res.status(400).json('password or username does not match')
        }

        const userToken = jwt.sign({
            id: duplicateUser._id,
            username: username,
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.cookie('token', userToken, {
            maxAge: 3600000,
            sameSite: 'strict',
            httpOnly: true
        })

        return res.status(201).json({
            message: 'Successfully login'
        })

    } catch (err) {
        return res.status(500).json({
            message: 'server side error',
            error: err
        })
    }
}

const handleCheckAuth = async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        return res.status(201).json('Currently Login')
    }
    return res.status(400).json('Not yet login')
}


const handleUserLogout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
        });

        return res.status(200).json({
            message: 'Successfully logged out',
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error',
            error: err,
        });
    }
};




module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleCheckAuth,
    handleUserLogout
}