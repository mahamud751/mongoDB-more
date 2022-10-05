const Product = require("../models/Product-model");

exports.createProductsService = async (data) => {
  const products = new Product(data);
  if (products.quantity === 0) {
    products.status = "out-of-stock";
  }
  const result = await products.save();
  return result;
};

exports.getProductsService = async (filters, queries) => {
  // const products = await Product.find(query);
  // const products = await Product.find({}).sort({ price: 1 });
  const products = await Product.find({})
    .select(queries.fields)
    .sort(queries.sortBy);
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

exports.bulkUpdateProductsService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateMany({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);

  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });

  return result;
};

exports.bulkDeleteProductsService = async (ids) => {
  // const result = await Product.deleteMany({ _id: ids });
  const result = await Product.deleteMany({});

  return result;
};
