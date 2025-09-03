const express = require("express");
const { addCategoryPage, addNewCategory, viewCategoryPage } = require("../controller/category.controller");
const { uploadImage } = require("../middleware/uploadImage");

const categoryRoutes = express.Router();

categoryRoutes.get("/add-category", addCategoryPage);
categoryRoutes.get("/view-categories", viewCategoryPage);

categoryRoutes.post("/add-category", uploadImage.single('categoryImage'), addNewCategory)
module.exports = categoryRoutes;