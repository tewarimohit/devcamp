const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error.js");
const connectDB = require("./config/db");
const Bootcamp = require("./models/Bootcamp.js");

// Route files

const bootcamp = require("./routes/Bootcamp.js");
const courses = require("./routes/Courses.js");

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
app.use("/api/v1/courses", courses);

// error handler

app.use(errorHandler); // use after routes

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
