const create = require("./insert-connection.js");
const trojanLinkMaker = require("../util/trojan-link-maker.js");
const createMany = async (details) => {
  try {
    const numberOf = details.numberOf;
    let connectionLinks = [],
      status = [];

    for (let i = 0; i < numberOf; i++) {
      let connectionData = await create(details.inputData);
      connectionLinks[i] = trojanLinkMaker(connectionData);
      status = await firewallAllow(connectionData.cPort);
    }
    resetXui();

    console.log(connectionLinks, status);

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
    inputData :{
    "remark":"remarkpathname",
    "period":number 0-12,
    "protocol":"trojan",
    "traffic":number for gb 0 is unlimited
}
}
*/
