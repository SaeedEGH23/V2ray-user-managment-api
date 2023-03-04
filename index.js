const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const checkAuthToken = require("./src/services/check-auth-token.js");
const connections = require("./src/controller/connections.js");
const validate = require("./src/services/validator-income-req.js");
const routes = require("./src/routes/v1");
require("dotenv").config();
const port = process.env.LISTEN_PORT;

// Authentication check
app.use("*", checkAuthToken);

app.use(bodyParser.json());

// app.use("/createUser", validate.middleInsValid);
// app.use("/remainCheck", validate.middleGetDataValid);
// app.use("/updateAccount", validate.middleUpdateAccount);

// configure routes
app.use("/v1", routes);

// app.post("/createUser", async (req, res) => {
//   // route to controller
//   const data = req.body;
//   try {
//     const userLink = await connections.createConnection(data);
//     res.status(200).send(userLink);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

app.post("/updateAccount", async (req, res) => {
  // route to controller
  const data = req.body;
  try {
    const userUpdate = await connections.updateConnection(data);
    res.status(200).send(userUpdate);
  } catch (err) {
    res.status(500).send(`An erro occurred while check data ${err}`);
  }
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
