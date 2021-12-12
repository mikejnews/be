const mongoose = require("mongoose");
const mediumSchema = require("./Medium");

const Scheema = mongoose.Schema;

const user = new Scheema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    clientData: {
      type: Scheema.Types.ObjectID,
      ref: "ClientData",
    },
    resetLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
