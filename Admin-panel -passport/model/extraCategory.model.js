const mongoose = require("mongoose");

const extraCategorySchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  extracategory: {
    type: String,
  },
});

module.exports = mongoose.model("ExtraCategory", extraCategorySchema);