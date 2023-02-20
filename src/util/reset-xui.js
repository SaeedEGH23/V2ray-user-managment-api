const { spawn } = require("child_process");

// Spawn the shell app

const app = spawn("x-ui");

// Serve "10" to the app
const resetX = () => {
  try {
    app.stdin.write("10");

    // After 2 seconds, send "\n" twice
    setTimeout(() => {
      app.stdin.write("\n");
      app.stdin.write("\n");
    }, 2000);
  } catch (err) {
    console.log(`cant restart x-ui cause ${err}`);
  }
};
resetX();
module.exports = resetX;
