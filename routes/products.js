const express = require("express");
const router = express.Router();
const { Products } = require("../models/Products");

// advanced filtering and pagination
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryobj = { ...this.queryString };
    console.log(queryobj);
    const excludedfields = ["page", "sort", "limit"];
    excludedfields.forEach(el => delete queryobj[el]);
    let querystr = JSON.stringify(queryobj);
    console.log(querystr);
    querystr = querystr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
    console.log(querystr);
    this.query.find(JSON.parse(querystr));
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortby = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortby);
    } else {
      this.query = this.query.sort("-createAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

// get all products
router.get("/", async (req, res) => {
  console.log("req", req.query);
  try {
    console.log("req2", req.query);

    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting()
      .paginating();
    console.log("req3", req.query);

    const products = await features.query;
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products
      }
    });
  } catch (err) {
    console.log("erreo papi erreo", err);
    res.status(404).json({
      status: "fail",
      message: err
    });
    console.error(err);
  }
});

// get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: product
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
    console.error(err);
  }
});

// create product
router.post("/", async (req, res) => {
  try {
    const newproduct = await Products.create(req.body);
    res.status(200).json({
      status: "success",
      data: newproduct
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err
    });
    console.error(err);
  }
});

// update product

router.patch("/:id", async (req, res) => {
  try {
    const newproduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );
    res.status(200).json({
      status: "success",
      data: newproduct
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
    console.error(err);
  }
});

// delete product
router.delete("/:id", async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
    console.error(err);
  }
});

module.exports = router;
