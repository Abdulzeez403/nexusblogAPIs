const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/userSchema");
const schematic = require("../models/schema");


const RegisterUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  //Check if the input is empty
  if (!username || !email || !password) {
    res.send(400);
    throw Error("All Field must be filled!");
  }

  //Check whether the user already exist!
  const User = await UserSchema.findOne({ email });
  if (User) {
    res.send(400);
    throw Error("The user is already exist!");
  }
  // Hash Password!
  const hashpassword = await bcrypt.hash(password, 10);
  console.log(hashpassword);

  const userInfo = await UserSchema.create({
    username,
    email,
    password: hashpassword,
  });
  res.status(200).send(userInfo);
  console.log(userInfo);
});

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if the input is empty
    if (!email || !password) {
      res.status(400);
      throw Error("All Field must be filled!");
    }

    const user = await UserSchema.findOne({ email });
    if (!user) res.status(404).send("User is not Found!");
    const isCorrect = bcrypt.compare(req.body.password, user.password);
    if (isCorrect) {
      let accesstoken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15days" }
      );
      res
        .cookie("accesstoken", accesstoken, { httpOnly: true })
        .status(200)
        .send({
          msg: "Login Successful",
          username: user.username,
          id: user.id,
          accesstoken,
        });
    }
  }
   catch (err) {
    console.log(err);
  }
};

const CurrentUser = asyncHandler( async (req, res) => {
  res.send({ message: "The current user!" });
});

const GettingUserBlogs = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const Blog = await schematic.find({ userId });
  res.status(200).send(Blog);
});

module.exports = {
  RegisterUser,
  LoginUser,
  CurrentUser,
  GettingUserBlogs
};
