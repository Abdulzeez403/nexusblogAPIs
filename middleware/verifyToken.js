const asyncHandler = require("express-async-handler");
const UserSchema = require("../models/userSchema");

const VerifyToken = asyncHandler(async (res, req) => {
  const token = req.cookie.accesstoken;

  if (!token) return console.log("Unauthorized User!");
 
  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
  //   if (err) {
  //     res.send(400);
  //     throw Error("The user is unauthorized!");
  //   }
  //   req._id = decode._id;
  //   next();
  // });
});

module.exports = { VerifyToken };
