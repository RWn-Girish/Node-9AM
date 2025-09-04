const express = require("express");
const { addSubCategoryPage, addSubCategory, viewSubCategoryPage } = require("../controller/subCategory.controller");

const subcategoryRoutes = express.Router();

subcategoryRoutes.get("/add-subcategory", addSubCategoryPage);
subcategoryRoutes.post("/add-subcategory", addSubCategory);
subcategoryRoutes.get("/view-subcategories", viewSubCategoryPage);

module.exports = subcategoryRoutes;