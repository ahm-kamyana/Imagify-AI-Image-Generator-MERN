const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Request error!",
      error: errors.array(),
    });
  }
  try {
    const { name, email, password } = req.body;

    if ((!name, !email, !password)) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ success: true, token, user: { name: user.name } });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Registration Error",
      data: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Request error!",
      error: errors.array(),
    });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details!" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exists!" });
    }
    const matchUser = await bcrypt.compare(password, user.password);
    if (matchUser) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res
        .status(200)
        .json({ success: true, token, user: { name: user.name } });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password!" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Login error", data: err.message });
  }
};

const userCredits = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Request error!",
      data: errors.array(),
    });
  }
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not found" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    } else {
      return res.status(200).json({
        success: true,
        credits: user.creditBalance,
        user: { name: user.name },
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error fetching credits",
      data: err.message,
    });
  }
};

const addUserCredits = async (req, res) => {
  console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Request error!",
      data: errors.array(),
    });
  }
  try {
    const { userId, credits } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not found" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    } else {
      const updateCredits = await userModel.findByIdAndUpdate(userId, {
        $inc: {
          creditBalance: credits,
        },
      });
      return res.status(200).json({
        success: true,
        credits: updateCredits,
        user: { name: user.name },
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error fetching credits",
      data: err.message,
    });
  }
};

module.exports = { registerUser, loginUser, userCredits, addUserCredits };
