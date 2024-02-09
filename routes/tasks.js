const tasks = require("express").Router();
const taskService = require("../services/Task");
const {
  createTaskValidator,
  getTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
  getFilteredTasksValidator,
  getTasksByPriorityValidator,
} = require("../validators/tasks");

const validateInput = require("../middlewares/validateInput");

tasks.get("/", [ getFilteredTasksValidator, validateInput ], (req, res) => {
  let tasks = [];
  const sort = req.query.sort || "asc";

  if (req.query && typeof req.query.status === "boolean") {
    tasks = taskService.getFilteredByStatus(req.query.status, sort);
  } else {
    tasks = taskService.getAll(sort);
  }

  return res.status(200).json(tasks);
});

tasks.post("/", [ createTaskValidator, validateInput ], (req, res) => {
  const {
    title,
    description,
    completed,
    priority,
  } = req.body;

  taskService.create({
    title,
    description,
    completed: !!completed,
    priority,
  });

  return res.status(201).send({
    status: true,
    message: "Task created successfully",
  });
});

tasks.get("/:id", [ getTaskValidator, validateInput ], (req, res) => {
  const taskId = req.params.id;

  const fetchedTask = taskService.findById(taskId);

  if (!fetchedTask) {
    return res.status(404).send({
      status: false,
      message: "Task not found!",
    });
  }

  return res.status(200).send(fetchedTask);
});

tasks.put("/:id", [ updateTaskValidator, validateInput ], (req, res) => {
  const body = req.body;
  const taskId = parseInt(req.params.id);
  const fetchedTaskId = taskService.findIndexById(taskId);

  if (fetchedTaskId === -1) {
    return res.status(404).send({
      status: false,
      message: "Task not found!",
    });
  }

  taskService.update(fetchedTaskId, body);

  return res.status(200).send({
    status: true,
    message: "Task updated successfully",
  });
});

tasks.delete("/:id", [ deleteTaskValidator, validateInput ], (req, res) => {
  const taskId = parseInt(req.params.id);

  const fetchedTaskId = taskService.findIndexById(taskId);

  if (fetchedTaskId === -1) {
    return res.status(404).send({
      status: false,
      message: "Task not found!",
    });
  }

  taskService.delete(fetchedTaskId);

  return res.status(200).send({
    status: true,
    message: "Task deleted successfully",
  });
});

tasks.get("/priority/:level", [ getTasksByPriorityValidator, validateInput ], (req, res) => {
  const level = req.params.level;
  const tasks = taskService.getFilteredTasksByPriority(level);
  return res.status(200).json(tasks);
});

module.exports = tasks;