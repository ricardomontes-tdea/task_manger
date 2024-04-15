const { Router } = require('express');
const { check } = require('express-validator');

const { createTask } = require('../controllers/tasksController');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

// Create a new task
router.post(
  '/tasks', 
  check('name', 'Name is mandatory').not().isEmpty(),
  validateFields,
  createTask
);

module.exports = router;