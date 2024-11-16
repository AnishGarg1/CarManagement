const mongoose = require("mongoose");

// Function to limit images array length to 10
const arrayLimit = (val) => val.length <= 10;

const carSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      // required: true,
    },
    images: {
      type: [String],
      validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
    },
  },
  { timestamps: true }
);


module.exports = new mongoose.model("Car", carSchema);
