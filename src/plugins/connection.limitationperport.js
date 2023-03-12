// ______________! important first install node-cron for running plugins seperately
const cron = require("node-cron");
const { exec } = require("node:child_process");
const Inbound = require("../model/inbounds");
const fs = require("fs");

const limitation = 3;
// log theme
const logger = async (message) => {
  const today = new Date();
  const filename = `LOG_file_-${today.getMonth() + 1}-${today.getDate()}.txt`;
  const filePath = `./${filename}`;

  const timestamp = new Date().toISOString();

  fs.appendFile(
    filePath,
    `\n[${timestamp}]: account: ${message} disabled`,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Data written to file ${filePath}`);
    }
  );
};

// Promise function to check exist connections of a port
function checkConnectionNumber(checkPort) {
  return new Promise((resolve, reject) => {
    exec(
      `netstat -an | grep ${checkPort} | grep ESTABLISHED | awk '{print $5}'`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stdout) {
          let x = stdout.split("\n");
          let n = [],
            exist;
          for (i in x) {
            let flag = 0;
            m = x[i].lastIndexOf(".");
            if (n.length < 1) {
              n[i] = x[i].slice(0, m);
            } else {
              for (exist of n) if (exist == x[i].slice(0, m)) flag++;

              if (x[i].slice(0, m) != "" && flag == 0) n[i] = x[i].slice(0, m);
            }
          }

          resolve(n.length);
        }
        if (stderr) {
          resolve(stderr);
        }
      }
    );
  });
}

const disabler = async () => {
  const ports = await Inbound.getData("port", "enable = 1");
  let disableRemarks = [];
  try {
    for (port of ports) {
      let usage = await checkConnectionNumber(port);
      if (usage > limitation) {
        const status = await Inbound.conditionalUpdate(
          "port",
          port,
          "enable",
          0
        );
        if (status) {
          const remark = await Inbound.getData(`remark`, `port = ${port}`);
          console.log(
            `account with name ${remark} disabled because of rich the limitation , abuse = ${usage}`
          );
          disableRemarks.push(
            `account with name ${remark} disabled because of rich the limitation , abuse = ${usage}`
          );
        }
      }
    }
  } catch (err) {
    return err;
  }
};

cron.schedule("*/10 * * * *", () => {
  disabler();
});
