const Inbound = require("../model/inbounds.js");
const timeSet = require("../util/timesetting.js");
const setTraffic = require("../util/traffic.js");
const getConnectionData = require("./show-connection-data.js");

class Timeouterror extends Error {
  constructor(message) {
    super(message);
    this.message = "Connection is expired please buy time first";
  }
}

class Notexistcnn extends Error {
  constructor(message) {
    super(message);
    this.message = "Connection is not exist, create connection first.";
  }
}

const updateConnection = async (data) => {
  let updateTraffic, updatePeriod, enabling, traffic, makeZeroUp, makeZeroDown;
  try {
    let connection = await Inbound.findByRemark(data.remark);
    console.log(`data.traffic:   ${data.traffic}`);
    // if connection exist
    if (connection) {
      if (data.traffic) traffic = setTraffic("gb", data.traffic);
      // expire connection cant buy just traffic its check the situation
      if (connection.enable == 0 && !data.period) {
        throw new Timeouterror();
      }

      console.log(`connectionid : ${connection.id}`);

      // update traddic
      if (data.traffic && data.traffic >= 0) {
        makeZeroDown = updateTraffic = await Inbound.updateConnectionField(
          "down",
          0,
          data.remark
        );

        makeZeroUp = updateTraffic = await Inbound.updateConnectionField(
          "up",
          0,
          data.remark
        );

        updateTraffic = await Inbound.updateConnectionField(
          "total",
          traffic,
          data.remark
        );
        console.log(
          `data trafffffffic: ${updateTraffic} , ${typeof traffic} , ${traffic}`
        );
        console.log(traffic);
      }
      if (data.period > 0) {
        let expTime =
          Date.now() > connection.expiry_time
            ? timeSet(data.period)
            : connection.expiry_time + data.period * (30 * 24 * 60 * 60 * 1000);
        updatePeriod = await Inbound.updateConnectionField(
          "expiry_time",
          expTime,
          data.remark
        );
        console.log(expTime);
      }
      if (connection.enable == 0 && data.period > 0) {
        enabling = await Inbound.updateConnectionField(
          "enable",
          1,
          data.remark
        );
        console.log(connection.enable);
      }
      let updated = { cname: data.remark };
      return await getConnectionData(updated);
    } else throw new Notexistcnn();
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

module.exports = updateConnection;
