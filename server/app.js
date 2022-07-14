const express = require("express");
// const bodyParser = require("body-parser");

const hotelRoute = require("./routes/hotel.routes");
const roomRoute = require("./routes/room.routes");

const app = express();

app.use(express.json());
app.use("/api/v1/hotels", hotelRoute);
app.use("/api/v1/rooms", roomRoute);

module.exports = app;
