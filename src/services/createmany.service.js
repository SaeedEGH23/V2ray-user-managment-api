const create = require("./insert-connection.js");
const trojanLinkMaker = require("../util/trojan-link-maker.js");
const resetXui = require("../util/reset-xui.js");
const firewallAllow = require("../util/firewall-allow.js");
const createMany = async (details) => {
  try {
    const numberOf = details.numberOf;
    let connectionLinks = [],
      status = [];

    for (let i = 0; i < numberOf; i++) {
      let connectionData = await create(details.inputData);
      connectionLinks[i] = trojanLinkMaker(connectionData);
      try {
        status[i] = await firewallAllow(connectionData.cPort);
      } catch (err) {
        status[i] = err.message;
      }
    }

    resetXui();

    console.log("this is create many service  => ", connectionLinks);
    console.log("this is create many service => ", status);

    return connectionLinks;
  } catch (err) {
    console.error(`Model connections Create err : ${err}`);
    return err.message;
  }
};

module.exports = createMany;
/* 
details{
    numberOf: number,
    inputData :
    {
    "remark":"remarkpathname",
    "period":number 0-12,
    "protocol":"trojan",
    "traffic":number for gb 0 is unlimited
    }
}
*/
