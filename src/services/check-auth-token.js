const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAuthToken = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else
    res.status(401).json({
      message: "Authentication not found",
    });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};

module.exports = checkAuthToken;
