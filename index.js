const express = require("express");
require("dotenv").config();

require("./queues/email.queue");

const { dbConnection } = require("./database/config");

// Env VARS
const { APP_PORT } = process.env;

const app = express();

// Parsing body payload
app.use(express.json());

// DB CONNECTION
dbConnection();

// app routes
app.use("/api/v1", require("./routes/taskRoutes"));

app.listen(APP_PORT, () => {
  console.log(`[INFO] SERVER RUNNING AT PORT ${APP_PORT}`);
});
