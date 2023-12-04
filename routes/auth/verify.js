const verifyRouter = require("express").Router();
const isAuthenticated = require("../../middleware/isAuthenticated");

verifyRouter.get("/verify", isAuthenticated, (req, res, next) => {
  res.send(req.user);
});

module.exports = verifyRouter;
