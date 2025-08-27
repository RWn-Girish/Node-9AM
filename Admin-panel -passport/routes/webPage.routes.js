const express = require("express");
const { allUsers } = require("../controller/webPage.controller");

const routes = express.Router();

routes.get("/",  allUsers);



module.exports = routes;