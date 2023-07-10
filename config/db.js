const mongoose = require("mongoose");

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "bootcamp",
  });
  console.log(
    `MongoDB Connected: ${connect.connection.host}`.yellow.underline.bold
  );
};

module.exports = connectDB;
