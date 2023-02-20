const { spawn } = require("child_process");

// Spawn the shell app
const app = spawn("your-shell-app");

// Serve "10" to the app
app.stdin.write("10");

// After 2 seconds, send "\n" twice
setTimeout(() => {
  app.stdin.write("\n");
  app.stdin.write("\n");
}, 2000);
