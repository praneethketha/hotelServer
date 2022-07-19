const mongoose = require("mongoose");
const User = require("./user");
const Hotel = require("./hotel");
const filterToSelect = require("./../utils/filterToSelect");

const bookingSchema = mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  from: {
    type: Date,
    required: [true, "Please enter the from date"],
  },
  to: {
    type: Date,
    required: [true, "Please enter the to date"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "hotel",
    select: filterToSelect(Hotel.schema.paths, "name", "_id", "rooms"),
  }).populate({
    path: "user",
    select: filterToSelect(User.schema.paths, "name", "email", "_id"),
  });
  next();
});

const Booking = mongoose.model("Bookings", bookingSchema);

module.exports = Booking;
