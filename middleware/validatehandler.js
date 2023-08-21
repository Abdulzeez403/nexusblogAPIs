const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const ValidateHandler = async (res, req, next) => {
  //   try {
  //     let token;
  //     const authHeader = await req.headers.authorization || req.headers.authentication;
  //     if (authHeader && authHeader.startWith("Bearer")) {
  //       token = authHeader.split(" ")[1];
  //       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
  //         if (err) {
  //           res.send(400);
  //           throw Error("The user is unauthorized!");
  //         }
  //         req.user = decode.user;
  //         next();
  //       });

  //       if (!token) {
  //         res.send(400);
  //         throw Error("The token has expired or its not found!");
  //       }
  //     }
  //   } catch (error) {
  //     console.log({
  //       error: new Error("Invlid request"),
  //     });
  //   }

  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // retrieve the user details of the logged in user
    const user = decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    console.log({
      error: new Error("Invalid request!"),
    });
  }
};

module.exports = ValidateHandler;
