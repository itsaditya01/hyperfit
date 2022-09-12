const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");

exports.Exercise = async (request, response) => {
    const exerciseDuration = request.body.exerciseDuration;
    const reps = request.body.reps;
    const exerciseName = request.body.exerciseName;
    const date = Date.now();
    
    try {
        const result = await User.findOneAndUpdate({
            email: email
        }, {
            mediataion: {
                meditationDate: date,
                meditationDuration: meditationDuration
            }
        })
    } catch (error) {
        console.log(error.message);
    response.status(500).json({ error: "Internal Server Error" });
    }
}