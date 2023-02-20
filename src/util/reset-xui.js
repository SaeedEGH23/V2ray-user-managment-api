const { spawn } = require("child_process");

const resetX = async () => {
  return new Promise((resolve, reject) => {
    const app = spawn("x-ui");

    // Listen for the "close" event of the stdin stream
    app.stdin.on("close", () => {
      console.log("end");
      resolve(200);
    });

    // Write "10" to the stdin stream
    app.stdin.write("10");

    // After 2 seconds, write "\n" twice
    setTimeout(() => {
      app.stdin.write("\n");
      app.stdin.write("\n");
    }, 7000);

    // Handle errors
    app.on("error", (err) => {
      console.log(`cant restart x-ui cause ${err}`);
      reject(err);
    });
  });
};

module.exports = resetX;
