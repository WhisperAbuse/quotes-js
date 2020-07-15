const router = require("express").Router();
const QuoteModel = require("../models/quote");

router.post("/", async (req, res, next) => {
  try {
    const { author, text, ...extra } = req.body;

    if (Object.keys(extra).length > 0) {
      return res
        .status(400)
        .send(`bodya contains extra fields:\n ${Object.keys(extra)}`);
    }

    const quote = new QuoteModel({
      author,
      text,
      user_id: req.user._id,
    });

    res.send(await quote.save());
  } catch (err) {
    next(err);
  }
});

router.get("/tea", (req, res) => {
  res.send(`<h1>${req.user.username}</h1>`);
});

module.exports = router;
