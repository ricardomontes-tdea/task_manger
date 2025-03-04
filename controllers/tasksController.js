const { response } = require("express");
const Task = require("../models/Task");

const createTask = async (req, res = response) => {
  const { name, description } = req.body;

  try {
    let task = await Task.findOne({ name });

    if (task) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Task already exists with this name",
        },
      });
    }

    task = new Task({ name, description });

    await task.save();

    res.json({
      ok: true,
      msg: "Task created!",
      data: {
        name: name,
        description: description,
      },
    });
  } catch (error) {
    console.log("[ERROR] ", error);

    res.status(500).json({
      ok: false,
      error: {
        message: "Something went wrong!",
      },
    });
  }
};

const getTasks = async (req, res = response) => {
  try {
    const tasks = await Task.find();

    res.json({
      ok: true,
      tasks,
    });
  } catch (error) {
    console.log("[ERROR] ", error);

    res.status(500).json({
      ok: false,
      error: {
        message: "Something went wrong!",
      },
    });
  }
};

const deleteTask = async (req, res = response) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "Task not found",
        },
      });
    }

    await Task.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Task deleted!",
    });
  } catch {
    console.log("[ERROR] ", error);

    res.status(500).json({
      ok: false,
      error: {
        message: "Something went wrong!",
      },
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
};
