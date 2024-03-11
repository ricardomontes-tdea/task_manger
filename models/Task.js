const { Schema, model } = require("mongoose");

const TaskSchema = Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  }
})

module.exports = model('Task', TaskSchema);