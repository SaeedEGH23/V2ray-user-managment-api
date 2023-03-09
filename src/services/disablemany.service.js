const Inbound = require("../model/inbounds");

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
    console.log(`Logger disableManyService ${disabled_connections}`);
    return disabled_connections;
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
