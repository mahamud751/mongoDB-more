const {
  getProduct,
  addProduct,
  updateProduct,
} = require("../controller/Product-controller.js");

const router = require("express").Router();

router.route("/").get(getProduct).post(addProduct);

router.patch("/:id", updateProduct);
module.exports = router;
