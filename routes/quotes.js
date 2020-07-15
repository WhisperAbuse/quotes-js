const router = require("express").Router();

router.post("/", (req, res) => {
  res.send("Hello");
});

router.get("/tea", (req, res) => {
  res.send(`<h1>${req.user.username}</h1>`);
});

module.exports = router;
