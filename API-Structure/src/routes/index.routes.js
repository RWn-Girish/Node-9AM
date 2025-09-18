const express = require('express');

const routes = express.Router();

routes.use("/auth", require("./auth.routes"));
routes.use("/users", require("./user.routes"));

module.exports = routes;