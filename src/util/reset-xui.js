const { exec } = require("child_process");

// Execute shell command

const exeXUI = () => {
  exec('echo "10\n\n" | x-ui', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command: ${err}`);
      return;
    }

    console.log(`Command output: ${stdout}`);
  });
};

module.exports = exeXUI;
