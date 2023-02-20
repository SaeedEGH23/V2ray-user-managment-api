const resetX = require("../util/reset-xui.js");
const test = () => {
  let stat = resetX();
  return stat;
};
test().then((stat) => {
  console.log(stat);
});
