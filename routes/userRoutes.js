const express = require("express");
const {
  getUsers,
  getSingleUser,
  createUser,
  delSingleUser,
  updateUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getSingleUser);

router.post("/create", createUser);

router.delete("/:id", delSingleUser);

router.patch("/:id", updateUser);

module.exports = router;
