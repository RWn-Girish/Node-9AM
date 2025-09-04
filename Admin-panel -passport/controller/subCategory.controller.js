const Category = require("../model/category.model");
const SubCategory = require("../model/subCategory.model");

exports.addSubCategoryPage = async (req, res) => {
  try {
    let categories = await Category.find();
    return res.render("subcategory/addSubCategory", { categories });
  } catch (error) {
    console.log(error);
    req.flash("error", "Server Error");
    return res.redirect("/");
  }
};

exports.viewSubCategoryPage = async (req, res) => {
  try {
    let subcategories = await SubCategory.find().populate('category');
    return res.render("subcategory/viewSubCategory", { subcategories });
  } catch (error) {
    console.log(error);
    req.flash("error", "Server Error");
    return res.redirect("/");
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    let subCatExist = await SubCategory.findOne({subcategory: req.body.subcategory});
    if(subCatExist){
        req.flash('warning', 'SubCategory Already Exist');
        return res.redirect("/subcategory/add-subcategory");
    }
    let newCategory = await SubCategory.create(req.body);
    if(newCategory){
        req.flash('success', 'Subcategory Added Success');
        return res.redirect("/subcategory/add-subcategory")
    }else{
        req.flash('error', 'Subcategory not Added');
        return res.redirect("/subcategory/add-subcategory")
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Server Error");
    return res.redirect("/");
  }
};
