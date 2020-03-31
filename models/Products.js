const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    summary: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Products = new mongoose.model("Products", productSchema);

exports.Products = Products;
