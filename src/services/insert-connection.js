const Inbound = require("../model/inbounds.js");
const timeSet = require("../util/timesetting.js");
const crypto = require("crypto");
const setTraffic = require("../util/traffic.js");
const portGenerator = require("../util/portgenerator.js");
require("dotenv").config();

const VPNdomain = process.env.VPN_DOMAIN;
const certPath = process.env.CERT_PATH || "/root/cert.crt";
const privatePath = process.env.PRIVATE_PATH || "/root/private.key";

let connectionPortNumber, password, traffic, remark, protocol, period;

const createInsertRequest = async (data) => {
  console.log(VPNdomain, certPath, privatePath);
  password = crypto.randomBytes(5).toString("hex");
  console.log("check");
  //   connectionPortNumber = await portGenerator(3500, 65000);
  connectionPortNumber = await portGenerator(3500, 65000);
  console.log(connectionPortNumber);
  traffic = Number(data.traffic) || 30;
  remark = data.remark + connectionPortNumber;
  protocol = data.protocol || "trojan";
  period = Number(data.period) || 1;

  const inbound = new Inbound({
    userId: 1,
    up: 0,
    down: 0,
    total: setTraffic("gb", traffic),
    remark: remark,
    enable: 1,
    expiryTime: timeSet(period),
    listen: null,
    port: connectionPortNumber,
    protocol: protocol,
    settings: `{
          "clients": [
            {
              "password": ${password},
              "flow": "xtls-rprx-direct"
            }
          ],
          "fallbacks": []
        }`,
    streamSettings: `{
          "network": "tcp",
          "security": "tls",
          "tlsSettings": {
            "serverName": ${VPNdomain},
            "certificates": [
              {
                "certificateFile": ${certPath},
                "keyFile": ${privatePath}
              }
            ]
          },
          "tcpSettings": {
            "header": {
              "type": "none"
            }
          }
        }`,
    tag: `inbound-${connectionPortNumber}`,
    sniffing: `{
          "enabled": false,
          "destOverride": [
            "http",
            "tls"
          ]
        }`,
  });

  inbound.save((err, id) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Inserted Inbound instance with ID ${id}`);
    }
  });
};

module.exports = createInsertRequest;