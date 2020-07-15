const router = require("express").Router();
const QuoteModel = require("../models/quote");
const UserModel = require("../models/user");


// get all users
router.get("/", (req, res, next) => {
    const users = await UserModel.find();
    res.send(users);
})

// get user by id
router.get("/:id", (req, res, next) => {
    const user = await UserModel.findById(req.params.id);
    res.send(user);
})

module.exports = router