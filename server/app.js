// 1) THIRD PARTY MODULES
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// 2) CUSTOM ROUTES
const hotelRoute = require("./routes/hotel.routes");
const roomRoute = require("./routes/room.routes");
const usersRouter = require("./routes/user.routes");
const bookingsRouter = require("./routes/booking.routes");

// 3) OTHER CUSTOM MODULES
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");

const app = express();

// 4) MIDDLEWARES

// 4a) CORS
app.use(cors({ origin: "*", credentials: true }));

// 4b) JSON PARSER
app.use(express.json({ limit: "10mb", extended: false }));

// 4c) COOKIE PARSER
app.use(cookieParser());

// 5) ROUTES
app.use("/api/v1/hotels", hotelRoute);
app.use("/api/v1/rooms", roomRoute);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/bookings", bookingsRouter);

// 6) OTHERS THAN SPECIFIED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} in this server!`, 404));
});

// 7) HANDLING ERRORS
app.use(globalErrorHandler);

module.exports = app;
