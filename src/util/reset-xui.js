const { spawn } = require("child_process");

const resetX = async () => {
  const xuiProcess = spawn("sh", [
    "-c",
    'pgrep x-ui > /dev/null && echo "10" | xargs -I{} echo {} | x-ui',
  ]);

  xuiProcess.on("exit", (code) => {
    console.log(`x-ui process exited with code ${code}`);
  });
};

module.exports = resetX;
