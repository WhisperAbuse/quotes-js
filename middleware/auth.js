const jwt = require("jsonwebtoken");
const config = require("../config");
const UserModel = require("../models/user");

const verifyAsync = (...args) => {
  return new Promise((res, rej) => {
    jwt.verify(...args, (err, token) => {
      err ? rej(err) : res(token);
    });
  });
};

module.exports = async (req, res, next) => {
  try {
    const decoded = await verifyAsync(
      req.headers.authorization.slice(7),
      config.secretKey
    );

    req.user = await UserModel.findById(decoded._id);
    if (!req.user) throw new Error();

    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
