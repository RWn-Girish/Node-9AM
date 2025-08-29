const User = require("../model/user.model");
const path = require('path');
const fs = require('fs');

exports.addNewUserPage = async(req, res) => {
  // let user = await User.findById(req.cookies.admin._id)
  return res.render("addUserForm");
};

exports.viewAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.render("viewAllUsers", { users });
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

exports.addNewUser = async (req, res) => {
  try {
    // console.log(req.body);
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    let newUser = await User.create({
      ...req.body,
      image: imagePath,
    });

    if (newUser) {
      console.log("User Created");
      req.flash("success", "New User Added!!!!");
      return res.redirect("/users/add-user");
    } else {
      console.log("Something Error");
      req.flash("error", "Something Error");
      return res.redirect("/users/add-user");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Error");
    return res.redirect("back");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    if(!user){
      console.log("User not Found");
      return res.redirect("/users/view-users");
    }
    if(user.image != ""){
      let imagePath = path.join(__dirname, "..", user.image);
      try {
        await fs.unlinkSync(imagePath);
      } catch (error) {
        console.log("File Missing");
      }
    }

    await User.findByIdAndDelete(id);
    console.log("User Delete Success");
    return res.redirect("/users/view-users");

  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
}

exports.editUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    if(!user){
      console.log("User not Found");
      return res.redirect("/users/view-users");
    }
    return res.render("editUser", {user});
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
}

exports.updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let imagePath;
    let user = await User.findById(id);
    if(!user){
      console.log("User not Found");
      return res.redirect("/users/view-users");
    }
    if(req.file){
      if(user.image != ""){
      imagePath = path.join(__dirname, "..", user.image);
      try {
        await fs.unlinkSync(imagePath);
      } catch (error) {
        console.log("File Missing");
      }
    }
    imagePath = `/uploads/${req.file.filename}`
    }else{
      imagePath = user.image;
    }
    await User.findByIdAndUpdate(id, {...req.body, image: imagePath}, {new: true});
    console.log("User Update Success");
    return res.redirect("/users/view-users");

  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
}
