const createInsertRequest = require("../services/insert-connection.js");
const getConnectionData = require("../services/show-connection-data.js");
const linkMaker = require("../util/trojan-link-maker.js");
const resetXui = require("../util/reset-xui.js");
const firewallAllow = require("../util/firewall-allow.js");

const createConnection = async (data) => {
  try {
    let userData = await createInsertRequest(data);
    console.log("userdata is here : ", userData);

    let connectionLink = await linkMaker(userData);

    let status = await firewallAllow(userData.cPort);
    resetXui();
    status += "user created !";
    return connectionLink;
  } catch (err) {
    console.error(`Model connections Creat err : ${err}`);
    return err.message;
  }
};

const connectionData = async (data) => {
  try {
    let userData = await getConnectionData(data);
    console.log(userData);
    return userData;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

module.exports = { createConnection, connectionData };
