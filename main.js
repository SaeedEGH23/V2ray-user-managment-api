const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userController = require("./src/controller/userController.js");
require("dotenv").config();
const port = process.env.LISTEN_PORT;

app.use(bodyParser.json());
// configure routes
app.get("/", (req, res) => {
  // route to controller
});

app.post("/createUser", (req, res) => {
  // route to controller
  const data = req.body;

  userController(data)
    .then((userLink) => {
      res.status(200).send(userLink);
      console.log(`userLink: ${userLink}`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while creating the user.");
    });
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
