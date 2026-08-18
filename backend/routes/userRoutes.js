const { registerUser, loginUser, userCredits,addUserCredits } = require("../controllers/userController");
const express = require("express");
const { body } = require("express-validator");
const { userAuth } = require("../middleware/user.auth");

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ], 
  registerUser
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  loginUser
);

userRouter.post("/credits",userAuth ,userCredits);
userRouter.post("/credits-add",userAuth ,addUserCredits);

module.exports = userRouter;
