const mongoose = require("../data/mongoose");
const Schema = mongoose.Schema;

const FoodtruckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  foodtype: {
    type: String,
    required: true
  },
  avgcost: {
    type: Number,
    required: true
  },
  geometry: {
    type: { type: String, default: "Point" },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Foodtruck = mongoose.model("Foodtruck", FoodtruckSchema);


module.exports = Foodtruck;
