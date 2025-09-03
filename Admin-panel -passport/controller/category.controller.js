const Category = require("../model/category.model");

exports.addCategoryPage = (req, res) => {
  try {
    return res.render("category/addCategory");
  } catch (error) {
    console.log("Error: ", error);
    req.flash("error", "Server Error");
    return res.redirect("/");
  }
};

exports.viewCategoryPage = async (req, res) => {
  try {
    let search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    let categories = await Category.find({
      category: { $regex: search, $options: "i" },
    });
    return res.render("category/viewCategory", { categories });
  } catch (error) {
    console.log("Error: ", error);
    req.flash("error", "Server Error");
    return res.redirect("/");
  }
};

exports.addNewCategory = async (req, res) => {
  try {
    let categoryExist = await Category.findOne({ category: req.body.category });
    if (categoryExist) {
      req.flash("warning", "Category is Already Exist");
      return res.redirect("/category/add-category");
    }
    let imagepath = "";
    if (req.file) {
      imagepath = `/uploads/${req.file.filename}`;
    }
    let newCategory = await Category.create({
      ...req.body,
      categoryImage: imagepath,
    });

    if (newCategory) {
      req.flash("success", "Category Addedd Success!!!");
      return res.redirect("/category/add-category");
    } else {
      req.flash("error", "Category Not Addedd.");
      return res.redirect("/category/add-category");
    }
  } catch (error) {
    console.log("Error: ", error);
    req.flash("error", "Server Error");
    return res.redirect("/");
  }
};
