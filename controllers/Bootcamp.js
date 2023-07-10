const Bootcamp = require("../models/Bootcamp.js");

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public

exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: { msg: "Show all bootcamps" },
  });
};
// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamp/:id
// @access    Public

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: { msg: `Display bootcamp ${req.params.id}` },
  });
};

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamp/:id
// @access    Private

exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: { msg: `Update Bootcamp ${req.params.id}` } });
};
// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamp/:id
// @access    Private

exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: { msg: `Delete bootcamp ${req.params.id}` } });
};
