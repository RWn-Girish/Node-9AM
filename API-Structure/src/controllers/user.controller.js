const UserModel = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find({isDelete: false});

        return res.json({status: 200, message: "Fetch All Users", data: users});

    } catch (error) {
        console.log(error);
        return res.json({status: 500, message: "Server Error"});
    }
}
exports.myProfile = async (req, res) => {
    try {
        return res.json({status: 200, message: "Fetch Profile", data: req.user});

    } catch (error) {
        console.log(error);
        return res.json({status: 500, message: "Server Error"});
    }
}

exports.updateProfile = async (req, res) => {
    try {
        // logic
        let user = req.user;
        return res.json({status: 200, message: "Fetch Profile", data: req.user});

    } catch (error) {
        console.log(error);
        return res.json({status: 500, message: "Server Error"});
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let user = req.user;
        user = await UserModel.findByIdAndUpdate(user._id, {isDelete: true}, {new: true})
        return res.json({status: 200, message: "Delete USer"});

    } catch (error) {
        console.log(error);
        return res.json({status: 500, message: "Server Error"});
    }
}