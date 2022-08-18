const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      default: 60,
      required: true,
    },
    height: {
      type: Number,
      default: 150,
      required: true,
    },
    age: {
      type: Number,
      default: 20,
    },
    goalWeight: {
      type: Number,
      default: 60,
      required: true,
    },
    streak: {
      type: Number,
      default: 0,
    },
    activeDays: {
      type: Array,
      default: [],
    },
    caloriesBurned: {
      type: Array,
      default: [],
    },
    ExerciseReps: {
      type: Array,
      default: [],
    },
    MediatationDuration: {
      type: Array,
      default: [],
    },
    lastActive: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
