const mongoose = require("mongoose");

const comment = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "BlogData",
    },
    email: {
      type:String
    },
    name:{
      type: String,
      require: true
    },
    body: {
      type: String,
      require: true,
      uniqe: [true, "body is mandatory"],
    },


  },
  { timestamps: true }
);
module.exports = mongoose.model("BlogComment", comment);
