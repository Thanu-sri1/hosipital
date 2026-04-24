const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authorization token missing", 401));
  }

  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = { protect };
