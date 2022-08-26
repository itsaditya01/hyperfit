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
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    goalWeight: {
      type: Number,
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    bmi: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
