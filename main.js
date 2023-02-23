const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const checkAuthToken = require("./src/services/check-auth-token.js");
const connections = require("./src/controller/connections.js");
require("dotenv").config();
const port = process.env.LISTEN_PORT;

// Authentication check
app.use("*", checkAuthToken);

app.use(bodyParser.json());
// configure routes
app.get("/", (req, res) => {
  // route to controller
});

app.post("/createUser", (req, res) => {
  // route to controller
  const data = req.body;

  connections
    .createConnection(data)
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

app.post("/remainCheck", async (req, res) => {
  // route to controller
  const data = req.body;
  try {
    const retData = await connections.connectionData(data);
    res.status(200).send(retData);
  } catch (err) {
    res.status(500).send(`An erro occurred while check data ${err}`);
  }
});

// Handle 404
app.all("*", (req, res) => {
  res.status(404).send({
    message: "Not Found",
  });
});

// start listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
