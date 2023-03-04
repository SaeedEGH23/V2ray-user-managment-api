const validate = require("../../middlewares/validate");
const controller = require("../../controller/connections.js");
const connectionValidation = require("../../validations/connection.validation");

const express = require("express");
const router = express.Router();

// router.post(
//   "/createUser",
//   validate(connectionValidation.createSchema),
//   controller.createConnection
// );

module.exports = router;
