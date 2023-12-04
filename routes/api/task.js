const taskRouter = require("express").Router();
const Task = require("../../models/Task.model");
const Project = require("../../models/Project.model");

taskRouter.post("/tasks", (req, res, next) => {
  const { title, description, projectID } = req.body;
  Task.create({ title, description, project: projectID })
    .then((newTask) => {
      return Project.findByIdAndUpdate(projectID, {
        $push: { tasks: newTask._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = taskRouter;
