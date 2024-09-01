const { verify } = require("jsonwebtoken");
const { User } = require("../models");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const [type, token] = authorization.split(" ");
    const decoded = verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) throw new Error("User is not registered");
    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: "Please Login First" });
  }

  next();
};

module.exports = auth;
