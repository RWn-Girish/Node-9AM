const express = require('express');
const routes = express.Router();

const uploadImage = require('../middleware/uploadImage');
const { productPage, addNewProduct, updateProduct, deleteProduct, editProduct } = require('../controller/product.controller');

routes.get("/", productPage);

routes.post("/add-product",uploadImage.single('image'), addNewProduct);
routes.get("/edit-product/:id", editProduct);
routes.post("/update-product/:id",uploadImage.single('image'), updateProduct);
routes.get("/delete-product/:id", deleteProduct);


module.exports = routes;