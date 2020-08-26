const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(bodyParser.json());

var corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/quotes", require("./routes/quotes"));
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

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
