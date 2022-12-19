const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");

exports.StoreMeditation = async (request, response) => {
  const meditationDuration = request.body.meditationDuration;
  const email = request.body.email;
  const date = Date.now();

  try {
    const result = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        $push: {
          meditation: {
            meditationDate: date,
            meditationDuration: meditationDuration,
          },
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

exports.RetrieveMeditation = async (request, response) => {
  // const date = request.body.date;
  const email = request.body.email;

  try {
    const user = await User.findOne({ email });
    response.json(user.meditation);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
