const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const UserModel = require("../models/user");

const signAsync = (...args) => {
  return new Promise((res, rej) => {
    jwt.sign(...args, (err, token) => {
      err ? rej(err) : res(token);
    });
  });
};

router.post("/login", async (req, res, next) => {
  const user = await UserModel.findOne({ username: req.body.username });

  if (!user) return res.status(403).send("Invalid username/password!");

  const same = await bcrypt.compare(req.body.password, user.password);

  if (same) {
    const token = await signAsync({ _id: user._id }, config.secretKey, {
      expiresIn: "24h",
    });

    res.send({ token });
  } else {
    res.send({
      status: "error",
      message: "Invalid username/password",
      data: {},
    });
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = new UserModel({ username, password });
    user.speak();

    res.send(await user.save());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
