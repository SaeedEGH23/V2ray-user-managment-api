const createInsertRequest = require("../services/insert-connection.js");
const getConnectionData = require("../services/show-connection-data.js");
const updateUserConnection = require("../services/update-connection.js");
const linkMaker = require("../util/trojan-link-maker.js");
const resetXui = require("../util/reset-xui.js");
const firewallAllow = require("../util/firewall-allow.js");
const disableMany = require("../services/disablemany.service");
const createMany = require("../services/createmany.service");

const createConnection = async (data) => {
  try {
    let userData = await createInsertRequest(data);
    console.log("userdata is here : ", userData);

    let connectionLink = await linkMaker(userData);
    let status;
    try {
      status = await firewallAllow(userData.cPort);
    } catch (err) {
      console.log(`Controller ufw active line ${err}`);
    }

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
    let userData = await getConnectionData.getConnectionData(data);
    console.log(userData);
    return userData;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

const allConnectionData = async () => {
  try {
    let connectionsData = await getConnectionData.getAllConnectionsData();
    console.log(connectionsData);
    return connectionsData;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

const updateConnection = async (data) => {
  try {
    let userData = await updateUserConnection(data);
    console.log(`userdata in controller update ${userData}`);
    return userData;
  } catch (err) {
    return err.message;
  }
};
const createManyConnections = async (data) => {
  try {
    let userData = await createMany(data);
    console.log(`userdata in controller update ${userData}`);
    return userData;
  } catch (err) {
    return err.message;
  }
};

const disableManyConnection = async (data) => {
  try {
    let disabledConnections = await disableMany(data);
    console.log(
      `disabled connections in controller updated ${disabledConnections}`
    );
    return disabledConnections;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  createConnection,
  connectionData,
  updateConnection,
  createManyConnections,
  disableManyConnection,
  allConnectionData,
};
