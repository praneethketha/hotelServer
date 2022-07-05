const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
    // name 
    // email
    // location
    // cover pic
    // contact number
    // state
    // rooms
    // description
  name: {
    type: String,
    required: [true, "a hotel must have a name"],
    unique: true,
    trim: true,
  },
  email: String,
  description: {
    type: String,
    trim: true,
    required: [true, "a hotel must have a description"],
  },
  cover_pic: {
    type: String,
    required: [true, "a hotel must have a cover image"],
  },
  certificates: [String],
  contact_number: {
    type: Number,
    match: /^[0-9]{10}/,
    required: [true, "a hotel must have a contact number"],
    validate: {
      validator: function (val) {
        const reg = /\+?\d[\d -]{8,12}\d/;
        return reg.test(val);
      },
      message: "please enter valid mobile number",
    },
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: {
      type: String,
      required: [true, "a hotel must have a address"],
      trim: true,
    },
    description: String,
  },
  rooms: {
    type: Number,
    required: [true, "a hostel must have a room count"],
  },
//   created_by: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//   },
  state: {
    type: String,
    required: [true, "a hotel must have a state"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
