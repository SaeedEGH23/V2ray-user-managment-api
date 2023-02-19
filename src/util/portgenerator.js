const { findByPort } = require("../model/inbounds.js");
const { exec } = require("child_process");

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

const portGenerator = async function report(from, to) {
  var random_int = Math.floor(Math.random() * (65000 - 3500 + 1)) + 3500;
  let checkBusyDb = await findByPort(random_int);
  let checkBusySh = await checkFree(random_int);
  console.log(checkBusySh, checkBusyDb);
  if (checkBusyDb == undefined && checkBusySh == undefined) {
    return random_int;
  } else {
    report(from, to);
  }
};

module.exports = portGenerator;
