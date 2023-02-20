const { spawn } = require("child_process");

const resetX = async () => {
  return new Promise((resolve, reject) => {
    const app = spawn("x-ui");

    // Listen for the "close" event of the stdin stream
    app.stdin.on("close", () => {
      console.log("stdin close event fired");
      console.log("app process status:", app.exitCode);
      app.kill();
      resolve(200);
    });

    // Write "10" to the stdin stream
    app.stdin.write("10");

    // Handle errors
    app.on("error", (err) => {
      console.log(`cant restart x-ui cause ${err}`);
      reject(err);
    });

    // Listen for the "exit" event of the child process
    app.on("exit", (code, signal) => {
      console.log("app exit event fired");
      console.log("exit code:", code);
      console.log("signal:", signal);
    });
  });
};

module.exports = resetX;
