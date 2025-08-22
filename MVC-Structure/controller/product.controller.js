const Product = require("../models/product.model");

exports.productPage = async (req, res) => {
  try {
    let allProducts = await Product.find();
    res.render("index", { products: allProducts });
  } catch (error) {
    console.log("Error: ", error);
    return res.redirect("back");
  }
};

exports.addNewProduct = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    let product = await Product.create({ ...req.body, image: imagePath });
    if (product) {
      console.log("Product Add Success");
      return res.redirect("/product");
    } else {
      console.log("Product not Added");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error: ", error);
    return res.redirect("back");
  }
};

exports.updateProduct = (req, res) => {
  console.log("Update Data Added");
};
exports.editProduct = (req, res) => {
  console.log("Delete Data Added");
};
exports.deleteProduct = (req, res) => {
  console.log("Delete Data Added");
};
