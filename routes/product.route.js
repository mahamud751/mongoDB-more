const {
  getProduct,
  addProduct,
  updateProduct,
  bulkUpdateProduct,
  deleteProductById,
  bulkDeleteProduct,
} = require("../controller/Product-controller.js");

const router = require("express").Router();

router.patch("/bulk-update", bulkUpdateProduct);
router.delete("/bulk-delete", bulkDeleteProduct);

router.route("/").get(getProduct).post(addProduct);

router.route("/:id").patch(updateProduct).delete(deleteProductById);

module.exports = router;
