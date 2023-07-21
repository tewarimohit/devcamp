const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

// Load env vars

dotenv.config({ path: "./config/config.env" });

// load models

const Bootcamp = require("./models/Bootcamp.js");
const Courses = require("./models/Course.js");

// connect db

mongoose.connect(process.env.MONGO_URI, {
  dbName: "bootcamp",
});

// Read JSON files

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// Import into database

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Courses.create(courses);

    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// delete data

const deletetData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Courses.deleteMany();

    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deletetData();
}
