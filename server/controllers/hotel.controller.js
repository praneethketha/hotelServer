const Hotel = require("../models/hotel");
const Booking = require("./../models/booking");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllHotel = catchAsync(async (req, res, next) => {
  const searchTerm = req.query.key || "";

  // name, city,

  const hotels = await Hotel.find({
    $or: [
      {
        name: { $regex: searchTerm, $options: "$i" },
      },
      {
        city: { $regex: searchTerm, $options: "$i" },
      },
    ],
  }).sort("basePrice");

  res.status(200).json({
    status: "success",
    results: hotels.length,
    data: hotels,
  });
});

exports.createHotel = catchAsync(async (req, res, next) => {
  const newHotel = new Hotel({ ...req.body });

  const hotel = await newHotel.save();

  res.status(201).json({
    status: "success",
    data: hotel,
  });
});

exports.getHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id).populate("rooms");

  if (!hotel) {
    return next(new AppError("no hotel found with that ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: hotel,
  });
});

exports.updateHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!hotel) {
    return next(new AppError("no hotel found with that ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: hotel,
  });
});

exports.deleteHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findOneAndDelete(req.params.id);

  if (!hotel) {
    return next(new AppError("no hotel found with that ID.", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.bookRoom = catchAsync(async (req, res, next) => {
  // ASSIGNING BODY.USERID WITH THE USER_ID SPECIFIED IN REQUEST OBJECT
  req.body.user = req.user._id;
  req.body.from = req.body.dates[0];
  req.body.to = req.body.dates[req.body.dates.length - 1];

  // CREATING BOOKING DOCUMENT
  const booking = await Booking.create(req.body);

  // SENDING THE RESPONSE
  res.status(200).json({
    success: "success",
    data: {
      booking,
    },
  });
});
