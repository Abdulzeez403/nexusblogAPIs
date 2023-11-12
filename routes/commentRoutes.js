const express = require("express");
const router = express.Router();
const { BlogComment, GetAllBlogComment, GetAllComment } = require('../controller/commentController')

router.route('/').get(GetAllComment)
router.route('/:id').post(BlogComment).get(GetAllBlogComment)
module.exports = router;
