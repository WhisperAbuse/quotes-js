const router = require("express").Router();
const QuoteModel = require("../models/quote");
const UserModel = require("../models/user");

// get all users
router.get("/", async (req, res, next) => {
  const users = await UserModel.find();
  res.send(users);
});

// get user by username
router.get("/:username", async (req, res, next) => {
  const user = await UserModel.findOne({ username: req.params.username });
  res.send(user);
});

module.exports = router;
