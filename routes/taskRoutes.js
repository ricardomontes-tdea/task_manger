const { Router } = require("express");
const { check } = require("express-validator");

const {
  createTask,
  deleteTask,
  getTasks,
} = require("../controllers/tasksController");

const { validateFields } = require("../middlewares/validateFields");

const router = Router();

// Create a new task
router.post(
  "/tasks",
  check("name", "Name is mandatory").not().isEmpty(),
  validateFields,
  createTask
);

// Get all tasks
router.get("/tasks", getTasks);

// Delete a task
router.delete("/tasks/:id", deleteTask);

module.exports = router;
