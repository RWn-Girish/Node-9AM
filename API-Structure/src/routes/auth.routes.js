const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');
const uploadImage = require('../middleware/uploadImage');

const routes = express.Router();

routes.post("/register",uploadImage.single('profileImage'),  registerUser);
routes.post("/login",  loginUser);

module.exports = routes;