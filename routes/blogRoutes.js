const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  PostBlog,
  GettingAllBlogs,
  GettingASingleBlog,
  UpdateSingleBlog,
  DeleteSingleBlog,
  GettingUserBlogs,
  likeAndUnlike
} = require("../controller/blogController");

const { VerifyToken } = require("../middleware/verifyToken");

//Receiving data from frontend sent it to database
//fetching all the data from the database to the frontend

router.route("/").get(GettingAllBlogs);
router.route("/likes/:id").put(likeAndUnlike
);



//Update a single blog
// Delete a single blog
//fetching a single blog
router
  .route("/:id")
  .get(GettingASingleBlog)
  .post(PostBlog)
  .delete(DeleteSingleBlog)
  .put(UpdateSingleBlog,);


module.exports = router;
