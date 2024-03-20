const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },

    place: {
      type: String,
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    cups: {
      type: String,
      required: false,
    },
    googlemaps: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const formModel = mongoose.model("forms", formSchema);

module.exports = formModel;
