// const express = require("express");

// const { app, connect } = require("../app.js");

// const port = 8000;
// app.listen(port, () => {
//   connect();
//   console.log("Connected to DB");
//   console.log("Server is listening port", port);
// });

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./../app");
dotenv.config({ path: "./.env" });

// mongoose connection
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("Connected to db"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));

// starting the server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is listening port 8000");
});
