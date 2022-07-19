const express = require("express");
const bookingController = require("./../controllers/booking.controller");
const router = express.Router();

router.route("/").get(bookingController.getAllBookings);

router.route("/:id").patch(bookingController.updateBooking);

module.exports = router;
