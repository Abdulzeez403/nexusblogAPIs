const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
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
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "BlogUser",
      default: [],

    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("BlogData", BlogSchema);

