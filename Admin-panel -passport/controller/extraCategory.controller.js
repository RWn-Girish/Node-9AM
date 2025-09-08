const Category = require("../model/category.model");
const SubCategory = require("../model/subCategory.model");
const ExtraCategory = require("../model/extraCategory.model");

exports.addExtraCategoryPage = async (req, res) => {
  try {
    let categories = await Category.find();
    let subcategories = await SubCategory.find();
    return res.render("extracategory/addExtraCategory", {
      categories,
      subcategories,
    });
  } catch (error) {
    console.log("Error: ", error);
    req.flash("error", "Server Error");
    return res.redirect("/");
  }
};

exports.addExtraCategory = async (req, res) => {
  try {
    // console.log(req.body);
    let category = await ExtraCategory.findOne({extracategory: req.body.extracategory});
    if(category){
        req.flash('warning', 'Already Exist');
        return res.redirect("/extracategory/add-extracategory");
    }
    category = await ExtraCategory.create(req.body);
    req.flash('success', 'New Extra Category Added Success');
    return res.redirect("/extracategory/add-extracategory");
  } catch (error) {
    console.log("Error: ", error);
    req.flash("error", "Server Error");
    return res.redirect("/");
  }
};
