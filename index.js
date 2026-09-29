const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./queues/email.queue");

const { dbConnection } = require("./database/config");

// Env VARS
const { APP_PORT, CORS_ORIGIN } = process.env;

const app = express();

// CORS
const corsOrigin =
  !CORS_ORIGIN || CORS_ORIGIN === "*"
    ? "*"
    : CORS_ORIGIN.split(",").map((origin) => origin.trim());

app.use(cors({ origin: corsOrigin }));

// Parsing body payload
app.use(express.json());

// DB CONNECTION
dbConnection();

// app routes
app.use("/api/v1", require("./routes/taskRoutes"));

app.listen(APP_PORT, () => {
  console.log(`[INFO] SERVER RUNNING AT PORT ${APP_PORT}`);
});
