const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    articleid: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
