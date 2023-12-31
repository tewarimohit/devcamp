const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add the course title"],
  },
  description: {
    type: String,
    required: [true, " Please add a description"],
  },
  weeks: {
    type: String,
    required: [true, " Please add the number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, " Please add the tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, " Please add the minimum skill required"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  ScholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
