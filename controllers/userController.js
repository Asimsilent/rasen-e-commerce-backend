const cartModel = require("../models/cartModels");
const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ error: "plz fill all inputs" });

    const exists = await userModel.findOne({ email });
    if (exists) return res.status(400).json({ error: "email already in use" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashed,
    });

    await cartModel.create({
      userId: user._id,
      items: [],
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "invalid credentials" });

    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated)
      return res.status(400).json({ error: "invalid credentials" });

    // const cart = await cartModel.findOne({userId: user._id})

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const delAllUser = async (req, res) => {
  try {
    const delUser = await userModel.deleteMany();
    res.status(200).json({ delUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const delSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const delUser = await userModel.findByIdAndDelete(id);
    res.status(200).json({ delUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.status(200).json({ updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  loginUser,
  delSingleUser,
  delAllUser,
  updateUser,
};

// const addCartItem = async (req, res) => {
//   try {
//     const { cart, userId } = req.body;

//     // Find the cart for this user (already guaranteed to exist)
//     const userCart = await cartModel.findOne({ userId });

//     // Check if item already exists (use productId if available instead of name)
//     const exists = userCart.items.find(
//       (item) => item.name === cart.name && item.price === cart.price
//     );

//     if (exists) {
//       return res.status(400).json({ error: "Item already in cart" });
//     }

//     // Otherwise, add item
//     userCart.items.push({ name: cart.name, price: cart.price });
//     await userCart.save();

//     res.status(201).json({ cart: userCart });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
