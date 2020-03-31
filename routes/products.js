const express = require("express");
const router = express.Router();
const { Products } = require("../models/Products");

// get all products
router.get("/", async (req, res) => {
  console.log("ay ma");
  try {
    const products = await Products.find();
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
