const apiRouter = require("express").Router();
const projectRouter = require("./project");
const taskRouter = require("./task");

apiRouter.get("/", (req, res, next) => {
  res.json({ message: "welcome to the API main route!" });
});

module.exports = (app) => {
  app.use("/api", apiRouter);
  app.use("/api", projectRouter);
  app.use("/api", taskRouter);
};
