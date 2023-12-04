const homeRouter = require("express").Router();

homeRouter.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = (app) => {
  app.use("/", homeRouter);
  require("./api")(app);
  require("./auth")(app);
};
