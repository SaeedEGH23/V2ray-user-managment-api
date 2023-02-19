const { findByPort } = require("../model/inbounds.js");
const { exec } = require("child_process");
const e = require("express");
require("dotenv").config();

const minPort = parseInt(process.env.MIN_PORT);
const maxPort = parseInt(process.env.MAX_PORT);

async function checkFree(newPort) {
  exec(`lsof -i tcp:${newPort}`, (err, stdout, stderr) => {
    if (err) {
      //   console.error(err);
      return true;
    } else {
      console.log(stdout);
      return false;
    }
  });
}

const portGenerator = async function report() {
  var random_int =
    Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort;
  let checkBusyDb = await findByPort(random_int);
  let checkBusySh = await checkFree(random_int);
  console.log(checkBusySh, checkBusyDb);
  if (checkBusyDb == undefined && checkBusySh == undefined) {
    return random_int;
  } else {
    report();
  }
};

module.exports = portGenerator;
