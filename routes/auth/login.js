const loginRouter = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");

loginRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ message: "All input fields are required" });
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.json({ message: "User not found" });
    const isPasswordMatch = await bcryptjs.compare(
      password,
      foundUser.password
    );
    if (!isPasswordMatch) return res.json({ message: "Wrong Password" });
    const { password: _, __v, ...payload } = foundUser.toObject();
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.send(token);
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
