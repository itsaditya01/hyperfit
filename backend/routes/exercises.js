const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");

exports.StoreExercise = async (request, response) => {
  const email = request.body.email;
  const exerciseId = request.body.exerciseId;
  const exerciseDuration = request.body.exerciseDuration;
  const repsPerformed = request.body.reps;
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
            caloriesBurned,
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
      response.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

exports.RetrieveExercise = async (request, response) => {
  // const date = request.body.date;
  const email = request.body.email;

  try {
    const user = await user.findOne({ email });
    response.json(user.exercise);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
