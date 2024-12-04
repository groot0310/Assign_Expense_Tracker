const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.headers["For authorisation"];
  if (!token) return res.status(401).json({ message: "No Access" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Your Token is Invalid" });
  }
};

module.exports = { checkToken };
