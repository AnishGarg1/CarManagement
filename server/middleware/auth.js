const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // Extracting jwt from request cookie, body or header
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    try {
      // verify the token
      const decode = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = decode;
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid" });
    }

    next(); // if token is valid, then move to next middleware or request handler
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};
