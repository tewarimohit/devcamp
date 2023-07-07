const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Route files

const bootcamp = require("./routes/Bootcamp.js");

// Logger

// const logger = require("./middleware/logger.js");

// Load env variables

dotenv.config({ path: "./config/config.env" });

const app = express();

// custom logger
// app.use(logger);

// Dev logging middleware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routes

app.use("/api/v1/bootcamps", bootcamp);

const PORT = 5000 || process.env.PORT;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`
  )
);
