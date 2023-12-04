const projectRouter = require("express").Router();
const mongoose = require("mongoose");
const Project = require("../../models/Project.model");
const isAuthenticated = require("../../middleware/isAuthenticated");

projectRouter.post("/projects", (req, res, next) => {
  const { title, description } = req.body;
  Project.create({ title, description, tasks: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

projectRouter.get("/projects", isAuthenticated, (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then((allProjects) => res.json(allProjects))
    .catch((err) => res.json(err));
});

projectRouter.get("/projects/:projectID", (req, res, next) => {
  const { projectID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Project.findById(projectID)
    .populate("tasks")
    .then((project) => res.status(200).json(project))
    .catch((error) => res.json(error));
});

projectRouter.put("/projects/:projectID", (req, res, next) => {
  const { projectID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Project.findByIdAndUpdate(projectID, req.body, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch((error) => res.json(error));
});

projectRouter.delete("/projects/:projectID", (req, res, next) => {
  const { projectID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Project.findByIdAndRemove(projectID)
    .then(() =>
      res.json({
        message: `Project with ${projectID} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = projectRouter;
