const express = require("express");
const app = express();
const dbase = require("./config/db");
const ErrorHandle = require("./middleware/errorHandle");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(cors(
  //   {
  //   origin: [process.env.FRONTEND_URL, process.env.BACKEND_URL],
  //   methods: ["POST", "GET", "PUT", "DELETE"],
  //   credentials: true
  // }
));

app.use(express.static("public"));
app.use(express.json({ extend: true }));
app.use(ErrorHandle);
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/comment", require("./routes/commentRoutes"));
dbase();
app.listen(PORT, (req, res) => {
  console.log(`This Server is running on port ${PORT}`);
});
