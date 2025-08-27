const User = require("../model/user.model");

exports.allUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.render("viewAllUsers", { users });
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};