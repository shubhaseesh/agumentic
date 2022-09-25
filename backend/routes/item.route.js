const express = require("express");
const router = express.Router();

// model
let Item = require("../models/Item");

// Add 
router.route("/create").post((req, res, next) => {
  Item.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get All 
router.route("/").get((req, res) => {
  Item.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(res.json(data));
    }
  });
});

// Get One 
router.route("/read/:id").get((req, res) => {
  Item.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update 
router.route("/update/:id").put((req, res, next) => {
 Item.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Data updated successfully");
      }
    }
  );
});

// Delete 
router.route("/delete/:id").delete((req, res, next) => {
  Item.findOneAndRemove({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
