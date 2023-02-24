const Inbound = require("../model/inbounds.js");
const timeSet = require("../util/timesetting.js");
const crypto = require("crypto");
const setTraffic = require("../util/traffic.js");
const portGenerator = require("../util/portgenerator.js");
const { resolve } = require("path");

require("dotenv").config();

class LimitationError extends Error {
  constructor(message) {
    super(message);
    this.message = "Server reach limitation";
  }
}

const VPNdomain = process.env.VPN_DOMAIN;
const certPath = process.env.CERT_PATH || "/root/cert.crt";
const privatePath = process.env.PRIVATE_PATH || "/root/private.key";
const totalLimitation = process.env.GLOBAL_LIMITATION || 0;
const enableLimitation = process.env.ENLABLED_LIMITATION || 0;

let connectionPortNumber, password, traffic, remark, protocol, period;

const createInsertRequest = async (data) => {
  const totalTop = await Inbound.getTotalInbounds();
  const enableTop = await Inbound.getTotalEnableInbounds();
  console.log(`service insert: ${totalLimitation} total ${totalTop}`);
  console.log(`service insert: ${enableLimitation} total ${enableTop}`);
  if (totalLimitation != 0 || enableLimitation != 0) {
    if (totalTop > totalLimitation) throw new LimitationError();
    if (enableTop > enableLimitation) throw new LimitationError();
  }

  password = crypto.randomBytes(5).toString("hex");

  connectionPortNumber = await portGenerator();
  console.log(connectionPortNumber);
  traffic = Number(data.traffic) || 30;
  remark = data.remark + connectionPortNumber;
  protocol = data.protocol || "trojan";
  period = Number(data.period) || 1;

  const inbound = new Inbound({
    id: connectionPortNumber,
    user_id: 1,
    up: 0,
    down: 0,
    total: setTraffic("gb", traffic),
    remark: remark,
    enable: 1,
    expiry_time: timeSet(period),
    listen: "",
    port: connectionPortNumber,
    protocol: protocol,
    settings: JSON.stringify({
      clients: [
        {
          password: password,
          flow: "xtls-rprx-direct",
        },
      ],
      fallbacks: [],
    }),
    stream_settings: JSON.stringify({
      network: "tcp",
      security: "tls",
      tlsSettings: {
        serverName: VPNdomain,
        certificates: [
          {
            certificateFile: certPath,
            keyFile: privatePath,
          },
        ],
      },
      tcpSettings: {
        header: {
          type: "none",
        },
      },
    }),
    tag: `inbound-${connectionPortNumber}`,
    sniffing: JSON.stringify({
      enabled: false,
      destOverride: ["http", "tls"],
    }),
  });
  try {
    await inbound.save();
    return {
      protocol: protocol,
      pass: password,
      domain: VPNdomain,
      cPort: connectionPortNumber,
      name: remark,
    };
  } catch (err) {
    return err;
  }
};

module.exports = createInsertRequest;
