const Inbound = require("../model/inbounds.js");
const showTraffic = require("../util/showtraffic.js");
const showremaintime = require("../util/showremaintime.js");
require("dotenv").config();
const showTime = require("../util/showremaintime");

const enableLimitationConnection = process.env.ENLABLED_LIMITATION || 0;
const allLimitationConnection = process.env.GLOBAL_LIMITATION || 0;

const getConnectionData = async (remark) => {
  try {
    let data = await Inbound.findByRemark(remark.cname);
    if (data == undefined)
      return `Connection with name ${remark.cname} does not exist!`;
    let traficRemain =
      data.total == 0
        ? "Unlimited"
        : showTraffic(data.total - (data.up + data.down));
    let timeRemain =
      data.expiry_time == 0 ? "Unlimited" : showremaintime(data.expiry_time);
    let dataInbound = {
      username: `${data.remark}`,
      RemainTime: `${timeRemain}`,
      RemainTraffic: `${traficRemain}`,
    };
    return dataInbound;
  } catch (err) {
    return err;
  }
};

const getAllConnectionsData = async () => {
  try {
    const allData = await Inbound.returnAllData();

    let enablecounter = 0,
      enables = [],
      disables = [];
    for (row of allData) {
      if (row.enable == 1) {
        enablecounter++;
        let enable = {
          remark: row.remark,
          totalusage: showTraffic(row.up + row.down),
          expiretime: showTime(row.expiry_time),
          port: row.port,
        };
        enables.push(enable);
      } else {
        let disable = {
          remark: row.remark,
          totalusage: showTraffic(row.up + row.down),
          expiretime: showTime(row.expiry_time),
          port: row.port,
        };
        disables.push(disable);
      }
    }
    let data = {
      enableConnections: enables.length,
      allConnections: allData.length,
      enableRemainToCreate: enableLimitationConnection - enables.length,
      allRemainToCreate: allLimitationConnection - allData.length,
      enables: enables,
      disables: disables,
    };
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

module.exports = { getConnectionData, getAllConnectionsData };
