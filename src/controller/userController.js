const createInsertRequest = require("../services/insert-connection.js");
const linkMaker = require("../util/trojan-link-maker.js");
const resetXui = require("../util/reset-xui.js");
const firewallAllow = require("../util/firewall-allow.js");

const userController = async (data) => {
  try {
    let userData = await createInsertRequest(data);
    console.log("userdata is here : ", userData);

    let connectionLink = await linkMaker(userData);

    let status = await firewallAllow(userData.connectionPortNumber);
    resetXui();
    status += "user created !";
    return connectionLink;
  } catch (error) {
    console.error(error);
  }
};

module.exports = userController;
