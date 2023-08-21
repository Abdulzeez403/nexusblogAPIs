const mongoose = require("mongoose");
const PostDetail = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "BlogUser",
    },
    title: {
      type: String,
    },

    body: {
      type: String,
    },

    image: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);
const schematic = mongoose.model("BlogData", PostDetail);
module.exports = schematic;
