const express = require("express");
// const bodyParser = require("body-parser");

const hotelRoute = require("./routes/hotel.routes");

const app = express();

app.use(express.json());
app.use("/api/v1/hotels", hotelRoute);

module.exports = app;
