const { body, param } = require("express-validator");

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
];

const deleteTaskValidator = [
  param("id")
    .isInt()
    .withMessage("id can only be a number")
    .toInt()
];

module.exports = {
  createTaskValidator,
  getTaskValidator,
  updateTaskValidator,
  deleteTaskValidator
};