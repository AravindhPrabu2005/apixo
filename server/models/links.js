const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Link", linkSchema);
