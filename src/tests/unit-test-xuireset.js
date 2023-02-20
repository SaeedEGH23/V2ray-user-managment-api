const resetX = require("../util/reset-xui.js");

resetX()
  .then((resolve, reject) => {
    console.log(resolve);
  })
  .then(console.log("good"))
  .catch((err) => {
    console.log(err);
  });
