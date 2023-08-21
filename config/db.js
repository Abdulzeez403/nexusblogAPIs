const mongoose = require("mongoose");

//connect to the mongodb

const dbase = async () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbase;
