const express = require("express");
const { addNewUserPage, addNewUser, viewAllUsers, deleteUser, editUser, updateUser } = require("../controller/user.controller");
const { uploadImage } = require("../middleware/uploadImage");
const routes = express.Router();

routes.get("/add-user", addNewUserPage);
routes.post("/add-user", uploadImage.single("image"), addNewUser);
routes.get("/view-users", viewAllUsers);
routes.get("/delete-user/:id", deleteUser);
routes.get("/edit-user/:id", editUser);
routes.post("/update-user/:id", uploadImage.single("image"), updateUser);


module.exports = routes;
