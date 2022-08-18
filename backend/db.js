const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoURL = process.env.MONGO_URL;

const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to mongoDB");
  });
};

module.export = connectToMongo;
