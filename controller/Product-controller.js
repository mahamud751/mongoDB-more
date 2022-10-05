const Product = require("../models/Product-model");
const {
  createProductsService,
  getProductsService,
  updateProductsService,
} = require("../services/product.services");

exports.addProduct = async (req, res) => {
  try {
    const result = await createProductsService(req.body);
    res.status(200).json({
      status: "successfully product added",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `cant't add product`,
      error: error.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const result = await getProductsService(req.query.limit);
    res.status(200).json({
      status: "successfully find all products",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `cant't get product`,
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateProductsService(id, req.body);
    res.status(200).json({
      status: "successfully update",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `cant't update`,
      error: error.message,
    });
  }
};
