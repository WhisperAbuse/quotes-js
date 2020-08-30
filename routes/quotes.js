const router = require("express").Router();
const QuoteModel = require("../models/quote");
const authMiddleware = require("../middleware/auth");
const UserModel = require("../models/user");

// create new quote
router.post("/", authMiddleware, async (req, res, next) => {
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

// get all quotes
router.get("/", async (req, res, next) => {
  const quotes = await QuoteModel.find();
  res.send(quotes);
});

// get quote by id
router.get("/:id", async (req, res, next) => {
  const quote = await QuoteModel.findById(req.params.id);
  res.send(quote);
});

// like/unlike quote
router.post("/:id/like", authMiddleware, async (req, res, next) => {
  const quote = await QuoteModel.findById(req.params.id);

  if (!quote) res.status(404).send("Quote not found");

  const { username, toggle } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (!user) return res.status(400).send("User not found");

  console.log(user);
  console.log(user.liked_quotes_ids);

  const isLiked = user.liked_quotes_ids.includes(quote._id);
  if (toggle) {
    if (isLiked) return res.status(400).send("Already liked");
    user.liked_quotes_ids.push(quote._id);
    quote.likes += 1;
  } else {
    if (!isLiked) return res.status(400).send("Already isn't liked");

    user.liked_quotes_ids.remove(quote._id);
    quote.likes -= 1;
  }
  await user.save();
  await quote.save();
  res.send({ likes: quote.likes, isLiked: isLiked });
});

// tea?
router.get("/tea", (req, res) => {
  res.send(`<h1>${req.user.username}</h1>`);
});

module.exports = router;
