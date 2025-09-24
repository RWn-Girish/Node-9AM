const express = require('express');
const { registerUser, loginUser, profile } = require('../controller/auth.controller');
const { verifyToken, verifyRole } = require('../middleware/verfiToken');

const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/profile", verifyToken, profile);
routes.put("/update", verifyToken, profile);
// routes.post("/add-manager", verifyToken, verifyRole('Admin'), addManager);

module.exports = routes;