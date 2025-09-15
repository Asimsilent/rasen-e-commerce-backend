const userModel = require("../models/userModels");

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
    const user = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.status(201).json({ user });
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
    console.log(req.body);

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
  delSingleUser,
  updateUser,
};
