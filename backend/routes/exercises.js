const { request } = require("express");
const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");

exports.StoreExercise = async (request, response) => {
  const email = request.body.email;
  const exerciseId = request.body.exerciseId;
  const exerciseDuration = request.body.exerciseDuration;
  const repsPerformed = request.body.repsPerformed;
  const partialReps = request.body.partialReps;
  const exerciseName = request.body.exerciseName;
  const caloriesBurned = request.body.caloriesBurned;
  const date = Date.now();

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          exercise: {
            exerciseId,
            exerciseName,
            exerciseDuration,
            repsPerformed,
            partialReps,
            caloriesBurned,
            date,
          },
        },
      }
    );
    if (user) {
      response.status(200).json({
        success: true,
        message: "Exercise information has been stored successfully",
        severity: "success",
      });
    } else {
      response
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error.message);
    response
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.RetrieveExercise = async (request, response) => {
  // const date = request.body.date;
  const email = request.body.email;

  try {
    const user = await User.findOne({ email });
    response.json(user.exercise);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

//Adding weight value
exports.StoreWeight = async (request, response) => {
  const email = request.body.email;
  const date = Date.now();
  const weightValue = request.body.weight;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          weight: {
            weightValue,
            date,
          },
        },
      }
    );
    if (user) {
      response.status(200).json({
        success: true,
        message: "Weight added successfully",
        severity: "success",
      });
    } else {
      response
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error.message);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//retrieve weight
exports.RetrieveWeight = async (request, response) => {
  const email = request.body.email;

  try {
    const user = await User.findOne({ email });
    response.json(user.weight);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

//Adding hydration value
exports.StoreHydration = async (request, response) => {
  const email = request.body.email;
  const date = Date.now();
  const hydrationValue = request.body.weight;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          hydration: {
            hydrationValue,
            date,
          },
        },
      }
    );
    if (user) {
      response.status(200).json({
        success: true,
        message: "Hydration added successfully",
        severity: "success",
      });
    } else {
      response
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error.message);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//retrieve hydration
exports.RetrieveHydration = async (request, response) => {
  const email = request.body.email;

  try {
    const user = await User.findOne({ email });
    response.json(user.hydration);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
