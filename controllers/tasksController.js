const { response } = require('express');

const createTask = (req, res = response) => {
  res.status(201).json({
    ok: true
  })
};

module.exports = {
  createTask
}
