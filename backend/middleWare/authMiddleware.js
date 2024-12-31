const jwt = require('jsonwebtoken');


const authMiddleware = async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json('Please login first')
    }
    const {id, username} = jwt.verify(token, process.env.JWT_SECRET)
    req.body.id = id;
    req.body.username = username;

    return next();
}

module.exports={
    authMiddleware
}