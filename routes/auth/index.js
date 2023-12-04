const authRouter = require("express").Router();
const loginRouter = require("./login");
const signupRouter = require("./signup");
const verifyRouter = require("./verify");

authRouter.get("/", (req, res, next) => {
  res.json({ message: "welcome to the AUTH main route!" });
});

module.exports = (app) => {
  app.use("/auth", authRouter);
  app.use("/auth", signupRouter);
  app.use("/auth", loginRouter);
  app.use("/auth", verifyRouter);
};
