const express = require("express");
const dotenv = require("dotenv");

// Load env variables

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = 5000 || process.env.PORT;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`
  )
);
