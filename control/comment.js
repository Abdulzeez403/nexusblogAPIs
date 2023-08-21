const asyncHandler = require("express-async-handler");
const commentSchema = require("../models/comment");
const mongoose = require("mongoose");

const BlogComment = asyncHandler(async (req, res) => {
  const { body, email, name } = req.body;
  const { id } = req.params;
  const createComment = await commentSchema.create({
    id,
    body,
    email,
    name
  });
  //   createComment.save();
  res.status(200).send(createComment);
});

const GetAllBlogComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Blog = await commentSchema.find({id});
  if (!Blog) {
    res.status(400);
    throw new Error("The BlogID is not defined!");
  }
  res.status(200).send(Blog);
});

const GetAllComment = asyncHandler(async (req, res) => {
  const Blog = await commentSchema.find();
  if (!Blog) {
    res.status(400);
    throw new Error("The BlogID is not defined!");
  }
  res.status(200).send(Blog);
});
module.exports = { BlogComment, GetAllBlogComment, GetAllComment };
