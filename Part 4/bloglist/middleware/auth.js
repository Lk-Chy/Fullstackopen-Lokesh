const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../utils/config");

const auth = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const token = authHeader.substring(7);

  try {
    const decodedToken = jwt.verify(token, config.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
