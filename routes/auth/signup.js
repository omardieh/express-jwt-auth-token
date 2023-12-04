const signupRouter = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../../models/User.model");

signupRouter.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.json({ message: "All input fields are required" });
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    const createdUser = await User.create({ username, email, password: hash });
    res.send(createdUser);
  } catch (err) {
    next(err);
  }
});

module.exports = signupRouter;
