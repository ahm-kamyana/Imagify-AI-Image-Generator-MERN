const { validationResult } = require("express-validator");
const FormData = require("form-data");
const axios = require("axios");
const userModel = require("../models/userModel");

const imageGenerator = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Request error!",
      error: errors.array(),
    });
  }
  try {
    const { userId, prompt } = req.body;
    if (!userId || !prompt) {
      return res.status(400).json({
        success: false,
        message: "Missing details!",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "No credits left!",
        credits: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.API_KEY,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );
    console.log(process.env.API_KEY, "key");
    await userModel.findByIdAndUpdate(userId, {
      creditBalance: user.creditBalance - 1,
    });
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const imageURL = `data:image/png;base64,${base64Image}`;
    return res.status(200).json({
      success: true,
      message: "Image generated successfully!",
      image: imageURL,
      credits: user.creditBalance - 1,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Image generation error!",
      data: err.message,
    });
  }
};

module.exports = imageGenerator;
