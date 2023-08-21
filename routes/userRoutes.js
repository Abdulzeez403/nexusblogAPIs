const express = require("express");
const ValidateHandler = require("../middleware/validatehandler");

const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  CurrentUser,
  GettingUserBlogs,
} = require("../control/userControl");
// const VerifyLogin = require("../middleware/verifyLogin");
router.post("/Login", LoginUser);
router.post("/Register", RegisterUser);
router.get("/current", ValidateHandler, CurrentUser);
router.get("/:id", GettingUserBlogs);

module.exports = router;
