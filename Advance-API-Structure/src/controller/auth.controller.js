const UserServices = require('../services/user.service');
const userServices = new UserServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
    try {
        let user = await userServices.findUser({email: req.body.email, isDelete: false});
        if(user){
            return res.json({status: 400, message: 'Admin Already Register'});
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10);
        let imagePath = "";
        if(req.file){
            imagePath = `/uploads/${req.file.filename}`
        }
        user = await userServices.addNewUser({
            ...req.body,
            password: hashPassword,
            profileImage: imagePath
        })
        return res.json({status: 201, message: 'Admin Register Success'})

    } catch (error) {
        console.log(error);
        return res.json({status: 500, message: 'Server Error'});
    }
}

exports.loginUser = async (req, res) => {
    try {
        let user = await userServices.findUser({email: req.body.email, isDelete: false});
        if(!user){
            return res.json({status: 404, message: 'Admin not found'});
        }
        let matchPass = await bcrypt.compare(req.body.password, user.password);
        if(!matchPass){
            return res.json({message: "Invalid Credential"});
        }
        let token = jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY);
        return res.json({message: 'Loging Success', token});
    } catch (error) {
        console.log(error);
        return res.json({status: 500, message: 'Server Error'});
    }
}

exports.profile = async (req, res) => {
    try {
        return res.json({message:'Fetch Profile', data: req.user});
    } catch (error) {
        console.log(error);
        return res.json({status: 500, message: 'Server Error'});
    }
} 