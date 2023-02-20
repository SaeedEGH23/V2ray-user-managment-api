const resetX = require("../util/reset-xui.js");
const test = async () => {
  let stat = await resetX();
  console.log(stat);
};
test();
