const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");

exports.Meditation = async (request, response) => {
  const meditationDuration = request.body.mediataionDuration;
  const email = request.body.email;
  const date = Date.now();

  try {
    const result = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        mediataion: {
          meditationDate: date,
          meditationDuration: meditationDuration,
        },
      }
    );
    response.status(200).json({
      success: true,
      message: "Meditation information has been stored",
      severity: "success",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
