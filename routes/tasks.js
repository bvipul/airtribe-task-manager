const tasks = require("express").Router();
const taskService = require("../services/Task");
const {
  createTaskValidator,
  getTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
} = require("../validators/tasks");

const validateInput = require("../middlewares/validateInput");

tasks.get("/", (req, res) => {
  const allTasks = taskService.getAll();

  return res.status(200).json(allTasks);
});

tasks.post("/", [ createTaskValidator, validateInput ], (req, res) => {
  const {
    title,
    description
  } = req.body;

  taskService.create({
    title,
    description,
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

module.exports = tasks;