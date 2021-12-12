const mongoose = require("mongoose");

const Scheema = mongoose.Schema;

const mediumSchema = new Scheema({});

module.exports = mongoose.model("medium", mediumSchema);
