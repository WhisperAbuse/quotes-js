const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(bodyParser.json());

app.use("/quotes", require("./routes/quotes"));
app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => res.send("Hi bich"));

mongoose.connect(config.dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Critical error (Db)!");
});

db.once("open", () => {
  console.log("Db connection established!");

  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
});
