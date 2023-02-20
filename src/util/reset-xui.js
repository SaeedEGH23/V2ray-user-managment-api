const { spawn } = require("child_process");

const resetX = async () => {
  // Spawn the x-ui process
  const app = spawn("x-ui");

  // Send "10" to the process's stdin stream
  app.stdin.write("10\n");

  // Wait for the process to exit and resolve with its status code
  const status = await new Promise((resolve) => {
    app.on("exit", (code) => {
      resolve(code);
    });
  });

  return status;
};

module.exports = resetX;
