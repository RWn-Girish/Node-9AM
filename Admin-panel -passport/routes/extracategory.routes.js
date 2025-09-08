const express = require('express');
const { addExtraCategoryPage, addExtraCategory } = require('../controller/extraCategory.controller');

const routes = express.Router();

routes.get("/add-extracategory", addExtraCategoryPage);
routes.post("/add-extracategory", addExtraCategory);

module.exports = routes;