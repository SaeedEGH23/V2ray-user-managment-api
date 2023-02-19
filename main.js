const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userController = require("./src/controller/userController.js");

const port = 3000;

app.use(bodyParser.json());
// configure routes
app.get("/", (req, res) => {
  // route to controller
});

app.post("/createUser", (req, res) => {
  // route to controller
  const data = req.body;
  userController(data);

  res.status(200).send("ok");
});

app.post("/reSubscribe", (req, res) => {
  // route to controller
  const data = req.body;
  res.status(200).send("ok");
});

app.post("/remainCheck", (req, res) => {
  // route to controller
  const data = req.body;
  res.status(200).send("ok");
});

// start listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
