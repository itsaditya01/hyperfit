const mongoose = require("mongoose");

const meditationSchema = mongoose.Schema({
  meditationDate: {
    type: Date,
  },
  meditationDuration: {
    type: Number,
    default: 0,
  },
});

const exerInfoSchema = mongoose.Schema({
  exerciseId: Number,
  exerciseName: String,
  exerciseDuration: Number,
  repsPerformed: {
    type: Number,
    default: 0,
  },
  partialReps: {
    type: Number,
    default: 0,
  },
  caloriesBurned: {
    type: Number,
    default: 0,
  },
  date: Date,
});

const weightInfoSchema = mongoose.Schema({
  weightValue: Number,
  date: Date,
});

const hydrationInfoSchema = mongoose.Schema({
  hydrationValue: Number,
  date: Date,
});

const userSchema = mongoose.Schema(
  {
    name: {
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
    weight: [weightInfoSchema],
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
    exercise: [exerInfoSchema],
    meditation: [meditationSchema],
    lastActive: {
      type: Date,
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
    token: {
      type: String,
    },
    hydration: hydrationInfoSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
