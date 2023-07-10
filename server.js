const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// Route files

const bootcamp = require("./routes/Bootcamp.js");

// Logger

// const logger = require("./middleware/logger.js");

// Load env variables

dotenv.config({ path: "./config/config.env" });

// Connect to db
connectDB();

const app = express();

// Body Parser

app.use(express.json());

// custom logger
// app.use(logger);

// Dev logging middleware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routes

app.use("/api/v1/bootcamps", bootcamp);

const PORT = 5000 || process.env.PORT;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`
      .blue.bold
  )
);

// Handle unhandled promise rejection

process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1));
});
