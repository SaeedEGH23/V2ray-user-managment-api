const { rejects } = require("assert");
const { exec } = require("child_process");
const { resolve } = require("path");

// Check if UFW is enabled

const allower = (port) => {
  return new Promise((resolve, rejects) => {
    exec("ufw status", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error checking UFW status: ${error}`);
        rejects(error);
      }

      if (stderr) {
        console.error(`UFW status error: ${stderr}`);

        rejects(stderr);
      }

      // Check if UFW is active/enabled
      if (stdout.includes("active")) {
        console.log("UFW is enabled");

        // Allow incoming traffic on the specified port
        exec(`ufw allow ${port}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error allowing port ${port}: ${error}`);
            rejects(error);
          }

          if (stderr) {
            console.error(`Error allowing port ${port}: ${stderr}`);
            rejects(stderr);
          }

          if (stdout) {
            console.log(stdout);
            resolve(stdout);
          }

          console.log(`Port ${port} allowed`);
        });
      } else {
        console.log("UFW is not enabled");
        rejects("function has problem");
      }
    });
  });
};

module.exports = allower;
