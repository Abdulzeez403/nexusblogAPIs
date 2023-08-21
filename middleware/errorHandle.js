const { constant } = require("../constant");
const ErrorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constant.VALIDATION_ERROR:
      res.send({
        title: "Validation Erorr",
        message: err.message,
        stackTrace: res.stack,
      });
      break;
    case constant.UNAUTHORIZED_ERROR:
      res.send({
        title: "Unauthorized Error",
        message: err.message,
        stackTrace: res.stack,
      });
      break;

    case constant.FORBIDDEN:
      res.send({
        title: "Forbidden",
        message: err.message,
        stackTrace: res.stack,
      });
      break;

    case constant.NOT_FOUND:
      res.send({
        title: "Not Found",
        message: err.message,
        stackTrace: res.stack,
      });
      break;
    default:
      console.log("No Error, All is well!");
      break;
  }
};
module.exports = ErrorHandle;

