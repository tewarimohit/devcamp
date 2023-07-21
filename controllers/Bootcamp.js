const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async.js");
const Bootcamp = require("../models/Bootcamp.js");
const geocoder = require("../utils/geocoder.js");
const Course = require("../models/Course.js");

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // copy req.query
  let reqQuery = { ...req.query };

  // Fields to execlude

  const removeFields = ["select", "sort", "page", "limit"];

  // loop over and remove field from reqQuery by deleting it

  removeFields.forEach((param) => delete reqQuery[param]);

  // Stringify req.query
  let queryString = JSON.stringify(reqQuery);

  //  modified to $gt{}, $gte etc
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // parsed the modefied query
  query = Bootcamp.find(JSON.parse(queryString)).populate("courses");

  // Select fields

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //  sort fields

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //  pagination

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 4;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalCount = await Bootcamp.countDocuments();
  query = query.skip(startIndex).limit(limit);

  // executing query
  const bootcamps = await query;

  // pagination Result

  const pagination = {};

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  if (endIndex < totalCount) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});
// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamp/:id
// @access    Public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id).populate("courses");
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
  // } catch (error) {
  //   // res.status(400).json({
  //   //   success: false,
  //   // });
  //   // next(new ErrorResponse(`Bootcamp with id ${req.params.id} not found`, 404));
  //   next(error);
  // }
});

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamp/:id
// @access    Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: bootcamp });
});
// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamp/:id
// @access    Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  await Course.deleteMany({ bootcamp: bootcamp._id });
  await Bootcamp.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    msg: `Bootcamp with id ${req.params.id} Deleted`,
  });
});

// @desc      Get bootcamps by radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private

exports.getBootcampsByRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get longitude and latitude

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius using radians

  //  divide dist by radius of earth
  // Earth radius = 6,963 mi / 6378 km

  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
