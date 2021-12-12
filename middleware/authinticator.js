const jwt = require("jsonwebtoken");
const { APIError } = require("../models/shared/messages");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    // const error = new Error("No authorization header");
    // error.statusCode = 401;
    // throw error;
    return next(APIError.errNoAutHeader());
  }
  const extractedToken = token.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(extractedToken, "secret");
  } catch (err) {
    return next(APIError.errUnauthorizedError());
  }
  if (!decodedToken) {
    const error = new Error(" Not authorized");
    error.statusCode(401);
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
