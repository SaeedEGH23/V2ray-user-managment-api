const Inbound = require("../model/inbounds.js");
const timeSet = require("../util/timesetting.js");
const setTraffic = require("../util/traffic.js");

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
  let updateTraffic, updatePeriod, enabling;
  try {
    let connection = await Inbound.findByRemark(data.remark);

    // if connection exist
    if (connection) {
      // expire connection cant buy just traffic its check the situation
      if (connection.enable == 0 && data.period <= 0) {
        throw new Timeouterror();
      }
      // sett traffic
      console.log(`connectionid : ${connection.id}`);

      if (data.traffic > 0) {
        let traffic = setTraffic("gb", data.period);
        updateTraffic = await Inbound.updateConnectionField(
          "total",
          traffic,
          data.remark
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
      return await Inbound.findByRemark(data.remark);
    } else throw new Notexistcnn();
    console.log(connection.total);
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

module.exports = updateConnection;
