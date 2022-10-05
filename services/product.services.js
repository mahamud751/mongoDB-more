const Product = require("../models/Product-model");

exports.createProductsService = async (data) => {
  const products = new Product(data);
  if (products.status === 0) {
    products.status = "out-of-stock";
  }
  const result = await products.save();
  return result;
};

exports.getProductsService = async (limit) => {
  const products = await Product.find({});
  return products;
};

exports.updateProductsService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    // { $set: data },
    // { $inc: data },
    { $inc: { price: 3 } },
    { runValidators: true }
  );
  //   const product = await Product.findById(productId);
  //   const result = await product.set(data).save();

  return result;
};
