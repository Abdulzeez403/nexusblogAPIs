const schematic = require("../models/schema");
const asyncHandler = require("express-async-handler");

const GettingASingleBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const BlogId = await schematic.findById(id, body, { new: true });
  if (!BlogId) {
    res.status(400);
    throw new Error("Cant get a single blog!");
  }
  res.status(200).send({ BlogId });
});

const GettingAllBlogs = asyncHandler(async (req, res) => {
  const category = req.query.category;

  // Get pagination parameters from query string
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  // Calculate start and end index for pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    if (category) {
      const Blog = await schematic
        .find({ category: category })
        .limit(endIndex)
        .skip(startIndex)
        .exec();
      res.status(200).send(Blog);
    } else {
      const Blog = await schematic
        .find()
        .limit(endIndex)
        .skip(startIndex)
        .exec();
      res.status(200).send(Blog, page, limit);
    }
  } catch (err) {
    throw new Error("error occurred!");
  }
});

const PostBlog = asyncHandler(async (req, res, next) => {
  const { title, body, image, category } = req.body;
  const userId = req.params.id;
  const Blogs = await schematic.create({
    userId,
    title,
    body,
    image,
    category,
  });
  res.status(200).send(Blogs);
});
const UpdateSingleBlog = asyncHandler(async (req, res) => {
  const { title, description, body, author } = req.body;
  const { id } = req.params;

  const updateBlog = await schematic.findByIdAndUpdate(
    id,
    {
      title,
      description,
      body,
      author,
    },
    { new: true }
  );
  if (!updateBlog) {
    res.status(400);
    throw new Error("Updated Error!");
  }
  res.status(200).send(updateBlog);
});

const DeleteSingleBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // const user = await schematic.findById(id);
  // if (req.id !== user.id) {
  //   res.status(400);
  //   throw new Error("You cant delete this!");
  // }
  const DeleteBlog = await schematic.findByIdAndRemove(id);
  if (!DeleteBlog) {
    res.status(400);
    throw new Error("Delete Failed!");
  }
  res.send("Deleted!");
});

module.exports = {
  PostBlog,
  GettingAllBlogs,
  GettingASingleBlog,
  UpdateSingleBlog,
  DeleteSingleBlog,
};
