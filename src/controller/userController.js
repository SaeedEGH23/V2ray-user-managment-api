const createInsertRequest = require("../services/insert-connection.js");
const userController = async (data) => {
  console.log(data.remark);
  console.log(data.period);
  console.log(data.protocol);
  console.log(data.traffic);
  await createInsertRequest(data);
};

module.exports = userController;
