const Inbound = require("../model/inbounds.js");
const showTraffic = require("../util/showtraffic.js");
const showremaintime = require("../util/showremaintime.js");

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

module.exports = getConnectionData;
