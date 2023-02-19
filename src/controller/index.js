const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/endpoint", (req, res) => {
  const data = req.body;
  // do something with the data
  console.log(data);
  res.status(200).send("OK");
});
