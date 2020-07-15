const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posted_quotes_ids: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Quote" }],
  liked_quotes_ids: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Quote" }],
});

userSchema.methods.speak = function () {
  const greeting = this.username
    ? "My name is " + this.username
    : "I don't have a name";
  console.log(greeting);
};

// hash password before saving it into DB
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("User", userSchema);
