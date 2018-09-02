const express = require("express");
const router = express.Router();

const Foodtruck = require("../models/Foodtruck");
const Review = require("../models/Review");

// get all /api/foodtruck
router.get("/", (req, res, next) => {
  Foodtruck.find({}, (err, foodtrucks) => {
    if (err) return next(err);
    res.json({ foodtrucks: foodtrucks });
  });
});

// add one /api/foodtruck
router.post("/", (req, res, next) => {
  let foodtruck = new Foodtruck();
  foodtruck.name = req.body.name;
  foodtruck.foodtype = req.body.foodtype;
  foodtruck.avgcost = req.body.avgcost;
  foodtruck.geometry.coordinates = req.body.geometry.coordinates;

  foodtruck.save(err => {
    if (err) return next(err);
    res.json({ message: "Foodtruck saved successfully" });
  });
});

// get one /api/foodtruck/:id
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Foodtruck.findById(id, (err, foodtruck) => {
    if (err) return next(err);
    res.json({ foodtruck: foodtruck });
  });
});

// update one /api/foodtruck/:id
router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  Foodtruck.findByIdAndUpdate(id, { $set: req.body }, { new: true }, (err, foodtruck) => {
    if (err) return next(err);
    res.json({ message: `Foodtruck info with ID_${foodtruck._id} updated successfully!` });
  });
});

// delete one /api/foodtruck/:id
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  Foodtruck.findByIdAndRemove(id, (err, foodtruck) => {
    if (err) return next(err);
    Review.remove({ foodtruck: foodtruck._id }, err => { // .remove() - delete all reviews with foodtruck: foodtruck._id
      if (err) return next(err);
      res.json({ message: "Foodtruck and all related reviews was successfully removed" });
    });
  });
});

// ========================================================

// get all reviews /api/foodtruck/rewiews/:id
router.get("/rewiews/:id", (req, res, next) => {
  let refId = req.params.id;
  Review.find({ foodtruck: refId }, (err, reviews) => {
    if (err) return next(err);
    res.json({ reviews: reviews });
  });
});

// add review /api/foodtruck/rewiews/:id
router.post("/rewiews/:id", (req, res, next) => {
  let id = req.params.id;
  Foodtruck.findById(id, (err, foodtruck) => {
    if (err) return next(err);

    let review = new Review();
    review.title = req.body.title;
    review.message = req.body.message;
    review.foodtruck = foodtruck._id;

    review.save((err, rewiew) => {
      if (err) return next(err);
      foodtruck.reviews.push(review); // add new review to foodtruck's reviews array
      foodtruck.save(err => {
        if (err) return next(err);
        res.json({ message: "Foodtruck review saved successfully" });
      });
    });
  });
});

module.exports = router;
