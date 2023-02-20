const createInsertRequest = require("../services/insert-connection.js");
const linkMaker = require("../util/trojan-link-maker.js");
const resetXui = require("../util/reset-xui.js");
const firewallAllow = require("../util/firewall-allow.js");

const userController = async (data) => {
  try {
    let userData = await createInsertRequest(data);
    console.log(userData);
    console.log(typeof userData);
    let connectionLink = await linkMaker(
      userData.protocol,
      userData.password,
      userData.VPNdomain,
      userData.connectionPortNumber,
      userData.remark
    );

    let status = await firewallAllow(userData.connectionPortNumber);
    resetXui();
    status += "user created !";
    return connectionLink;
  } catch (error) {
    console.error(error);
  }
};

module.exports = userController;
