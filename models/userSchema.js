const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      uniqe: [true, "username is mandatory"],
    },

    email: {
      type: String,
      require: true,
      uniqe: [true, "email is mandatory"],
    },

    password: {
      type: String,
      require: true,
      uniqe: [true, "password is mandatory"],
    },
    // role:{
    //   type: String,
    //   default: ['Admin']
    // }
  },
  { timestamps: true }
);
module.exports = mongoose.model("BlogUser", UserSchema);
