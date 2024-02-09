const { body, param, query } = require("express-validator");

const getFilteredTasksValidator = [
  query("status")
    .optional()
    .isBoolean()
    .withMessage("status can only be boolean value")
    .toBoolean(),
  query("sort")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("invalid sort value"),
];

const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("title can't be empty")
    .isString()
    .withMessage("title can only be a string value")
    .trim(),
  body("description")
    .notEmpty()
    .withMessage("description can't be empty")
    .isString()
    .withMessage("description can only be a string value")
    .trim(),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("completed can only be a boolean value")
    .toBoolean(),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("invalid priority")
    .trim(),
];

const getTaskValidator = [
  param("id")
    .isInt()
    .withMessage("id can only be a number")
    .toInt()
];

const updateTaskValidator = [
  param("id")
    .isInt()
    .withMessage("id can only be a number")
    .toInt(),
  body("title")
    .optional()
    .isString()
    .withMessage("title can only be a string value")
    .trim(),
  body("description")
    .optional()
    .isString()
    .withMessage("description can only be a string value")
    .trim(),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("completed can only be a boolean value")
    .toBoolean(),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("invalid priority")
    .trim(),
];

const deleteTaskValidator = [
  param("id")
    .isInt()
    .withMessage("id can only be a number")
    .toInt()
];

const getTasksByPriorityValidator = [
  param("level")
  .isIn(["low", "medium", "high"])
  .withMessage("invalid priority"),
];

module.exports = {
  createTaskValidator,
  getTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
  getFilteredTasksValidator,
  getTasksByPriorityValidator,
};