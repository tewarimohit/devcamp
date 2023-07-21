const express = require("express");
const router = express.Router();

const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsByRadius,
} = require("../controllers/Bootcamp.js");

// Include other resource router

const courseRouter = require("./Courses.js");

// Re-route into other resource router

router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
router.route("/radius/:zipcode/:distance").get(getBootcampsByRadius);

module.exports = router;
