const { exec } = require("child_process");

// Check if UFW is enabled
const allower = (port) => {
  exec("sudo ufw status", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error checking UFW status: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`UFW status error: ${stderr}`);
      return;
    }

    // Check if UFW is active/enabled
    if (stdout.includes("Status: active")) {
      console.log("UFW is enabled");

      // Allow incoming traffic on the specified port
      exec(`sudo ufw allow ${port}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error allowing port ${port}: ${error}`);
          return;
        }

        if (stderr) {
          console.error(`Error allowing port ${port}: ${stderr}`);
          return;
        }

        console.log(`Port ${port} allowed`);
      });
    } else {
      console.log("UFW is not enabled");
    }
  });
};

module.exports = allower;
