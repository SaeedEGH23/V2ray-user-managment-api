const createInsertRequest = require("../services/insert-connection.js");

const userController = async (data) => {
  let userLink;
  try {
    userLink = await createInsertRequest(data);
    console.log("userlink: ", userLink);
    return userLink;
  } catch (error) {
    console.error(error);
  }
};

module.exports = userController;
