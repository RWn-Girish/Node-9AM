const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategory: {
    type: String,
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
