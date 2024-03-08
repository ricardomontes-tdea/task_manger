const { response } = require('express');

const createTask = (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: 'reponse ok!'
  })
};

module.exports = {
  createTask
}
