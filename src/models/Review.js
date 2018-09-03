const mongoose = require("../data/mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  foodtruck: {
    type: Schema.Types.ObjectId,
    ref: "Foodtruck",
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model("Review", ReviewSchema);


module.exports = Review;
