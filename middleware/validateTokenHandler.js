const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.json({
          "status":401,
          "message":"User is not authorized"
      });
        
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  } else {
    res.json({
      "status":401,
      "message":"User is not authorized"
  });
  }
});

module.exports = validateToken;