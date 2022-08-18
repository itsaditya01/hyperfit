const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema(
  {
    exerciseID: {
      type: String,
      unique: true,
      required: true,
    },
    exerciseName: {
      type: String,
      required: true,
      unique: true,
    },
    repsPerformed: {
      type: String,
      required: true,
    },
    caloriesBurned: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
