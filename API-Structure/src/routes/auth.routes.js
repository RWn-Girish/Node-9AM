const express = require('express');
const { registerUser } = require('../controllers/auth.controller');

const routes = express.Router();

routes.post("/register", registerUser);

module.exports = routes;