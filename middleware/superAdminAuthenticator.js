const jwt = require("jsonwebtoken");
const { APIError } = require("../models/shared/messages");

module.exports = async (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    return next(APIError.errNoAutHeader());
  }
  const extractedToken = token.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = await jwt.verify(extractedToken, "secret");
    if (decodedToken.userId !== "607a85b76d665250cf8a8514") {
      throw err;
    }
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
