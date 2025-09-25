const express = require("express");
const router = express.Router();
const {
  // getCart,
  getCartByUser,
  addCartItem,
  removeCartItem,
  // delCartItem,
  // updateCartItem,
  delAllCart,
} = require("../controllers/cartController");

// router.get("/cart", getCart);
router.get("/cart/:id", getCartByUser);
router.post("/cart/add", addCartItem);
router.patch("/cart/remove/:itemId", removeCartItem);
// router.delete("/delCart/:id", delCartItem);
router.delete("/delCarts", delAllCart);
// router.patch("/cart/update/:id", updateCartItem);

module.exports = router;
