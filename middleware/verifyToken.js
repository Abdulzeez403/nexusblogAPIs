const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const VerifyToken = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the token is in the cookies
  token = req.cookies.jwt;

  // If there's no token in cookies, check the headers
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.UserId).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized, Invalid token" });
  }
});

module.exports = { VerifyToken };
