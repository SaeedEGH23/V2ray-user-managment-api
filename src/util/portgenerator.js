const { findByPort } = require("../model/inbounds.js");
const { exec } = require("child_process");
const e = require("express");
const { resolve } = require("path");
const { rejects } = require("assert");
const { stat } = require("fs");
const ignores = process.env.IGNOR_PORTS.split(",") || [""];
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

async function checkIgnores(newPort) {
  return new Promise((resolve, rejects) => {
    let status = true;
    let ignore = [];
    for (ignore of ignores) {
      if (newPort === Number(ignore)) {
        status = false;
      }
    }
    console.log(`this is port generator: status${status}`);
    status ? resolve(status) : rejects(status);
  });
}

const portGenerator = async function report() {
  var random_int =
    Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort;
  let checkBusyDb = await findByPort(random_int);
  let checkBusySh = await checkFree(random_int);
  let checkIgnoration = await checkIgnores(random_int);
  console.log(checkBusySh, checkBusyDb);
  if (checkBusyDb == undefined && checkBusySh == undefined && checkIgnoration) {
    return random_int;
  } else {
    report();
  }
};

module.exports = portGenerator;
