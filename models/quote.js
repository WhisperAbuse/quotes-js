const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user_id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Quote", quoteSchema);
