const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoURL = process.env.MONGO_URL;

const connectToMongo = async () => {
  await mongoose.connect(mongoURL).catch((error) => console.log(error));
};

module.exports = { connectToMongo };
