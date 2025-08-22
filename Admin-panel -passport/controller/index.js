const sendEmail = require("../middleware/mailMesage");
const User = require("../model/user.model");
const otpgenerator = require("otp-generator");

exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("admin");
    return res.redirect("/");
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};
exports.loginPage = (req, res) => {
  try {
    if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
      return res.render("auth/loginPage");
    } else {
      return res.redirect("/dashboard");
    }
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

exports.dashboard = async (req, res) => {
  try {
    if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
      return res.redirect("/");
    } else {
      let user = await User.findById(req.cookies.admin._id);
      return res.render("dashboard", { user });
    }
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

exports.loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      if (user.password == req.body.password) {
        console.log("Login Success");
        res.cookie("admin", user);
        return res.redirect("/dashboard");
      } else {
        console.log("User Credential Wrong");
        return res.redirect("/");
      }
    } else {
      console.log("User not found");
      return res.redirect("/");
    }
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

exports.userPofile = async (req, res) => {
  try {
    if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
      return res.redirect("/");
    } else {
      let user = await User.findById(req.cookies.admin._id);
      return res.render("profile", { user });
    }
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

exports.forgotPasswordPage = async (req, res) => {
  try {
    return res.render("auth/forgotPassword");
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

exports.sendEmail = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found");
      return res.redirect("/");
    }

    let otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let mailMessage = {
    from: 'rw3.girish.gk@gmail.com',
    to: `${req.body.email}`,
    subject: "Reset Password for Admin Panel",
    html: `
    <h2>Hello Vivek</h2>
    <p>Your Reset password Pin is: ${otp}.</p>
    <p>This Password is valid only 5 Minutes.</p>

    <p>Thank You!!!!</p>
    `, // HTML body
  }

    sendEmail(mailMessage);
    res.cookie('otp', otp);
    res.cookie('email', user.email);
    return res.render('auth/otp-page');
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

exports.verifyOTP = async(req, res) => {
  try {
    let otp = req.cookies.otp;
    if(otp == req.body.otp){
      res.clearCookie("otp");
      return res.render("auth/newPassword");
    }else{
      console.log("OTP is Not Verified!!!!");
      return res.redirect("back")
    }
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    let email = req.cookies.email;
    let user = await User.findOne({email: email});
    if(user){
        if(req.body.cpassword == req.body.newpassword){
          await User.findByIdAndUpdate(user._id, {password: req.body.newpassword}, {new: true});
          res.clearCookie("email");
          return res.redirect("/");
        }else{
          console.log("Password is not matched");
          return res.redirect("back");
        }
    }else{
      return res.redirect("/");
    }
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("back");
  }
}
