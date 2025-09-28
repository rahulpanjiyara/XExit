const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token provided" });

    if (token.startsWith("Bearer ")) token = token.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: "Invalid token" });

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "hr") return res.status(403).json({ message: "Access denied" });
  next();
};

module.exports = { authMiddleware, adminMiddleware };
