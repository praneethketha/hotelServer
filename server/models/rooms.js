const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  price: {
    type: Number,
    require: true,
  },

  maxPeople: {
    type: Number,
    require: true,
  },

  desc: {
    type: String,
  },

  roomNumbers: {
    type: [{ number: Number }],
    require: true,
  },
});

const Room = mongoose.model("rooms", roomSchema);

module.exports = Room;
