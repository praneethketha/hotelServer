const mongoose = require("mongoose");
const Hotel = require("./hotel");

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Please provide  hotel"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide  hotel"],
  },
});

reviewSchema.pre(/^find/, function (next) {
  // populating user with id
  this.populate({
    path: "hotel",
    select: "name",
  }).populate({
    path: "user",
    select: "name photo",
  });

  next();
  // -> will move corresponding controller that we are handling
  // -> getAllReviews() ->  find({}) -> this function -> next() -> getAllReviews()
});

// adding methods to the schema it self
//

reviewSchema.statics.calcAverageRatings = async function (hotelId) {
  const stats = await this.aggregate([
    {
      $match: { hotel: hotelId },
    },
    {
      $group: {
        _id: "$hotel",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Hotel.findByIdAndUpdate(hotelId, {
    ratingsQuantity: stats[0].nRating,
    rating: stats[0].avgRating,
  });
};

reviewSchema.post("save", function () {
  // this points to current document

  this.constructor.calcAverageRatings(this.hotel);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
