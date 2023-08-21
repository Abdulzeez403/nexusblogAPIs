// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");
const UserSchema = require("../models/userSchema");
const ValidateHandler = async (res, req, next) => {
  try {
    const email = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await UserSchema.findOne({ email });
    if (!exist) console.log("User is not Found");
    next();
  } catch (error) {
    console.log({ error: "Authorized user!" });
  }
};

module.exports = ValidateHandler;
