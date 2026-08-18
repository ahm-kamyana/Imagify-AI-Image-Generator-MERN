const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const userAuth = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Request error!",
        error: errors.array(),
      });
  }
  const { token } = req.headers;
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token not found, login again!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id) {
      req.body.userId = decoded.id;
      next();
    }
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Authentication error!",
        data: err.message,
      });
  }
};

module.exports = { userAuth };
