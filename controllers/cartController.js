const cartModel = require("../models/cartModels");

// const getCart = async (req, res) => {
//   try {
//     const cart = await cartModel.find({});
//     res.status(200).json({ cart });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

const getCartByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await cartModel.findOne({ userId: id });
    if (!cart) return res.status(404).json({ error: "cart not found" });
    res.status(200).json({ cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addCartItem = async (req, res) => {
  try {
    const { cart, userId } = req.body;

    const userCart = await cartModel.findOne({ userId });

    const exist = userCart.items.find(
      (item) => item.name === cart.name && item.price == cart.price
    );

    if (exist)
      return res
        .status(400)
        .json({ addCartItemError: "item is already in cart" });

    const updatedCart = await cartModel.findOneAndUpdate(
      { userId },
      { $push: { items: { name: cart.name, price: cart.price } } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ cart: updatedCart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params; // from URL
    const { userId } = req.body; // from request body

    // Find the cart of this user and pull one item out
    const updatedCart = await cartModel.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: itemId } } }, // removes the product with this id
      // { $pull: { items: { _id: new mongoose.Types.ObjectId(itemId) } } },
      { new: true } // return the updated cart
    );

    if (!updatedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json({ cart: updatedCart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// const delCartItem = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deletedCartItem = await cartModel.findByIdAndDelete(id);
//     res.status(200).json({ deletedCartItem });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

const delAllCart = async (req, res) => {
  try {
    const deletedAllCart = await cartModel.deleteMany();
    res.status(200).json({ deletedAllCart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// const updateCartItem = async (req, res) => {
//   try {
//     console.log(req.body);
//     const id = req.params.id;
//     const body = req.body;
//     const updatedCartItem = await cartModel.findByIdAndUpdate(id, body, {
//       new: true,
//     });
//     res.status(200).json({ updatedCartItem });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

module.exports = {
  // getCart,
  getCartByUser,
  addCartItem,
  removeCartItem,
  // delCartItem,
  delAllCart,
  // updateCartItem,
};
