const express = require('express');
const { dashboard, loginPage, loginUser, logoutUser, userPofile, forgotPasswordPage, sendEmail, verifyOTP, resetPassword } = require('../controller');
const passport = require('passport');
const routes = express.Router();

routes.get("/", loginPage);

routes.post("/login", passport.authenticate('local', {failureRedirect: "/"}), loginUser);
routes.get("/logout", logoutUser);
routes.get("/profile", userPofile);

routes.get("/forgot-password", forgotPasswordPage);
routes.post("/send-email", sendEmail);
routes.post("/verify-otp", verifyOTP);
routes.post("/reset-password", resetPassword);

routes.get("/dashboard", dashboard);

routes.use("/users", require("./users.routes.js"));

module.exports = routes;