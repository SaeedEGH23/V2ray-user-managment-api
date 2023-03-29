const Inbound = require("../model/inbounds");
const resetXui = require("../util/reset-xui.js");

const disabler = async (data) => {
  try {
    let disabled_connections = [];
    console.log(data);
    for (remark of data.remarks) {
      let status;
      console.log(remark);
      status = await Inbound.updateConnectionField("enable", 0, remark);
      if (status) disabled_connections.push(remark);
    }
    resetXui();
    console.log(`Logger disableManyService ${disabled_connections}`);
    data = { disable_connections: disabled_connections };
    return data;
  } catch (err) {
    console.log(`This is alog from disableManyService ${err.message}`);
    return err.message;
  }
};

module.exports = disabler;

/*//// @structure schema for input data for disable many 
    {
        remarks:['remark1', 'remark2']
    }
*/
