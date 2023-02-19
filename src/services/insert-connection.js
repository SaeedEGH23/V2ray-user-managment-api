const Inbound = require("../model/inbounds.js");
const timeSet = require("../util/timesetting.js");
const crypto = require("crypto");
const setTraffic = require("../util/traffic.js");
const portGenerator = require("../util/portgenerator.js");
const linkMaker = require("../util/trojan-link-maker.js");
require("dotenv").config();

const VPNdomain = process.env.VPN_DOMAIN;
const certPath = process.env.CERT_PATH || "/root/cert.crt";
const privatePath = process.env.PRIVATE_PATH || "/root/private.key";

let connectionPortNumber, password, traffic, remark, protocol, period;

const createInsertRequest = async (data) => {
  console.log(VPNdomain, certPath, privatePath);
  password = crypto.randomBytes(5).toString("hex");
  console.log("check");

  connectionPortNumber = await portGenerator();
  console.log(connectionPortNumber);
  traffic = Number(data.traffic) || 30;
  remark = data.remark + connectionPortNumber;
  protocol = data.protocol || "trojan";
  period = Number(data.period) || 1;

  let setting = `{ "clients": [ { "password": ${password}, "flow": "xtls-rprx-direct" } ], "fallbacks": [] }`,
    stream_setting = `{ "network": "tcp", "security": "tls", "tlsSettings": { "serverName": ${VPNdomain}, "certificates": [ { "certificateFile": ${certPath}, "keyFile": ${privatePath} } ] }, "tcpSettings": { "header": { "type": "none" } } }`,
    tagStapm = `inbound-${connectionPortNumber}`,
    snif = '{"enabled": false,"destOverride": ["http","tls"]}';

  const inbound = new Inbound({
    id: connectionPortNumber,
    user_id: 1,
    up: 0,
    down: 0,
    total: setTraffic("gb", traffic),
    remark: remark,
    enable: 1,
    expiry_time: timeSet(period),
    listen: null,
    port: connectionPortNumber,
    protocol: protocol.toString(),
    settings: setting.toString(),
    stream_settings: stream_setting.toString(),
    tag: tagStapm.toString(),
    sniffing: snif,
  });

  inbound.save((err, id) => {
    if (err) {
      console.error(err);
      return err;
    } else {
      console.log(`Inserted Inbound instance with ID ${id}`);
      console.log(
        linkMaker(protocol, password, VPNdomain, connectionPortNumber, remark)
      );
    }
  });

  return linkMaker(protocol, password, VPNdomain, connectionPortNumber, remark);
};

module.exports = createInsertRequest;
