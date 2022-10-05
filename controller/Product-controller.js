const Product = require("../models/Product-model");
const {
  createProductsService,
  getProductsService,
  updateProductsService,
  bulkUpdateProductsService,
  deleteProductByIdService,
  bulkDeleteProductsService,
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
    const filters = { ...req.query };

    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }
    // console.log("original", req.query);
    // console.log("new", filters);

    const result = await getProductsService(filters, queries);
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

exports.bulkUpdateProduct = async (req, res) => {
  try {
    const result = await bulkUpdateProductsService(req.body);
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

exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);
    res.status(200).json({
      status: "successfully delete",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `cant't delete`,
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res) => {
  try {
    const result = await bulkDeleteProductsService(req.body.ids);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "failed",
        message: `cant't delete`,
        error: error.message,
      });
    }
    res.status(200).json({
      status: "successfully delete",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `cant't delete`,
      error: error.message,
    });
  }
};
