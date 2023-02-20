const resetX = require("../util/reset-xui.js");
const test = async () => {
  let stat = await resetX();
  return stat;
};
test().then((stat) => {
  console.log(stat);
});
