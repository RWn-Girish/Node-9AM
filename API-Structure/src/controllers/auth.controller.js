const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

exports.registerUser = async(req, res) => {
    try {
       let user = await UserModel.findOne({email: req.body.email, isDelete: false})
       if(user){
        return res.json({status: 400, message: "User Already Exist"});
       }
       let imagePath = "";
       if(req.file){
        imagePath = `/uploads/${req.file.filename}`;
       }
       let hashPassword = await bcrypt.hash(req.body.password, 10);
       user = await UserModel.create({
        ...req.body,
        password: hashPassword,
        profileImage: imagePath
       });
       return res.json({status: 201, message: "New User Register"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'})
    }
}

exports.loginUser = async(req, res) => {
    try {
        let user = await UserModel.findOne({email: req.body.email, isDelete: false});
        if(!user){
            return res.json({status: 404, message: "User not found"});
        }
        let comaprePassword = await bcrypt.compare(req.body.password, user.password)
        if(comaprePassword){
            let token = jwt.sign({
                userId: user._id,
            }, process.env.SECRET_KEY)
            return res.json({status: 200,message: "Login Success", token: token})
        }else{
            return res.json({status: 400,message: "Invalid Credential"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'})
    }
}