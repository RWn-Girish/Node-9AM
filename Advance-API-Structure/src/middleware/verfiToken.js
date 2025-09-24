const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.verifyToken = async(req, res, next) => {
    let authorization = req.headers['authorization'];
    console.log(authorization);
    if(!authorization){
        return res.json({message: 'Unauthorized'});
    }
    let token = authorization.split(" ")[1];
    if(!token){
        return res.json({message: 'Token Missing'});
    }
    let {userId} = jwt.verify(token, process.env.SECRET_KEY)
    let user = await User.findById(userId);
    if(!user){
        return res.json({message: "Invalid User"})
    }
    req.user = user;
    next();
}


exports.verifyRole = (...roles) => {
    return (req, res, next) => {
        if(roles.includes(req.user.role)){
            next();
        }
        else{
            return res.json({message: "Invalid Role"});
        }
    }
}