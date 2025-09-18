const express = require('express');
const { getAllUsers, myProfile, updateProfile, deleteUser } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/verifyToken');
const uploadImage = require('../middleware/uploadImage');

const routes = express.Router();

routes.get("/", verifyToken,  getAllUsers);
routes.get("/profile", verifyToken,  myProfile);
routes.put("/update-profile", verifyToken, uploadImage.single('profileImage'),  updateProfile);
routes.delete("/delete-user", verifyToken,   deleteUser);

module.exports = routes;