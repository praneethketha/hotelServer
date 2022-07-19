const mongoose = require("mongoose");
const User = require("./user");
const Room = require("./rooms");
const filterToSelect = require("./../utils/filterToSelect");

const hotelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide a description"],
    },
    cover_pic: {
      type: String,
      required: [false, "Please provide a cover image"],
    },
    images: [String],
    contact_number: {
      type: Number,
      match: /^[0-9]{10}/,
      required: [true, "Please provide a contact number"],
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
        required: [false, "Please provide the address"],
        trim: true,
      },
      description: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 3,
    },
    basePrice: {
      type: Number,
      required: [true, "Please provide a base price"],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    city: {
      type: String,
      required: [true, "Please provide the city"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

hotelSchema.virtual("rooms", {
  ref: "Room",
  foreignField: "hotel",
  localField: "_id",
});

hotelSchema.pre(/^find/, function (next) {
  // populating user with id
  this.populate({
    path: "created_by",
    select: filterToSelect(User.schema.paths, "name", "email", "_id"),
  });

  next();
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
