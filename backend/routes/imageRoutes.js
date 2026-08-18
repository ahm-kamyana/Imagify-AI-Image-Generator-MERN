const express = require("express");
const { userAuth } = require("../middleware/user.auth");
const imageGenerator = require("../controllers/imageController");

const imageRouter = express.Router();

imageRouter.post("/generate", userAuth, imageGenerator);

module.exports = imageRouter;
