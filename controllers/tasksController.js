const { response } = require('express'); 
const Task = require('../models/Task');

const createTask = async (req, res = response) => {
  const { name, description } = req.body

  try {
    let task = await Task.findOne({ name });

    if (task) {
      return res.status(400).json({
        ok: false,
        error: {
          message: 'Task already exists with this name'
        }
      });
    }

    task = new Task({ name, description });

    await task.save();

    res.json({
      ok: true,
      msg: 'Task created!',
      data: { 
        name: name,
        description: description
      }
    });
  } catch (error) {
    console.log('[ERROR] ', error);

    res.status(500).json({
      ok: false,
      error: {
        message: 'Something went wrong!'
      }
    })
  }
};

module.exports = {
  createTask
}
