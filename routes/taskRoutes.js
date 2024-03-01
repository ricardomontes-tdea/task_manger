const { Router } = require('express');
const { createTask } = require('../controllers/tasksController');

const router = Router();

// Create a new task
router.post('/tasks', createTask)

module.exports = router;