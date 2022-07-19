const catchAsync = require("../utils/catchAsync");
const Booking = require("./../models/booking");

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: "success",
    data: bookings,
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: booking,
  });
});
