const { Schema, model } = require("mongoose");

const TaskSchema = Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
})

module.exports = model('Task', TaskSchema);