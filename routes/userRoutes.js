const express = require("express");
const {
  // getUsers,
  getSingleUser,
  createUser,
  loginUser,
  // delSingleUser,
  delAllUser,
  // updateUser,
} = require("../controllers/userController");
const router = express.Router();

// router.get("/user", getUsers);
router.get("/user/:id", getSingleUser);
router.post("/user/create", createUser);
router.post("/user/login", loginUser);
// router.delete("/delUser/:id", delSingleUser);
router.delete("/delUsers", delAllUser);
// router.patch("/user/update/:id", updateUser);

module.exports = router;