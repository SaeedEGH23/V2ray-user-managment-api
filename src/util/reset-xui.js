const { spawn } = require("child_process");

const resetX = async () => {
  // Spawn the x-ui process
  const app = spawn("x-ui");

  // Send "10" to the process's stdin stream
  app.stdin.write("10\n");
  setTimeout(() => {
    app.stdin.write("^C");
    return 200;
  }, 4000);
  // Wait for the process to exit and resolve with its status code
  //   const status = await new Promise((resolve) => {
  //     app.on("exit", (code) => {
  //       resolve(code);
  //     });
  //   });
};

module.exports = resetX;
