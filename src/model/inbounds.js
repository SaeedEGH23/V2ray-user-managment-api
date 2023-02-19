const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const DBpath = process.env.DB_PATH || "/etc/x-ui/x-ui.db";
const db = new sqlite3.Database(DBpath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS inbounds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    up INTEGER NOT NULL,
    down INTEGER NOT NULL,
    total INTEGER NOT NULL,
    remark TEXT NOT NULL,
    enable BOOLEAN NOT NULL,
    expiryTime INTEGER NOT NULL,
    listen NULL,
    port INTEGER NOT NULL UNIQUE,
    protocol TEXT NOT NULL CHECK(protocol IN ('tcp', 'kcp', 'ws', 'h2', 'quic', 'trojan', 'vmess')),
    settings TEXT NOT NULL,
    streamSettings TEXT NOT NULL,
    tag TEXT NOT NULL UNIQUE,
    sniffing TEXT NOT NULL
  )`);
});

class inbounds {
  constructor({
    userId,
    up,
    down,
    total,
    remark,
    enable,
    expiryTime,
    listen,
    port,
    protocol,
    settings,
    streamSettings,
    tag,
    sniffing,
  }) {
    this.userId = userId;
    this.up = up;
    this.down = down;
    this.total = total;
    this.remark = remark;
    this.enable = enable;
    this.expiryTime = expiryTime;
    this.listen = listen;
    this.port = port;
    this.protocol = protocol;
    this.settings = settings;
    this.streamSettings = streamSettings;
    this.tag = tag;
    this.sniffing = sniffing;
  }

  save(callback) {
    const sql = `INSERT INTO inbounds (userId, up, down, total, remark, enable, expiryTime, listen, port, protocol, settings, streamSettings, tag, sniffing)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      this.userId,
      this.up,
      this.down,
      this.total,
      this.remark,
      this.enable,
      this.expiryTime,
      this.listen,
      this.port,
      this.protocol,
      this.settings,
      this.streamSettings,
      this.tag,
      this.sniffing,
    ];

    db.run(sql, values, function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, this.lastID);
      }
    });
  }

  static findById(id, callback) {
    const sql = `SELECT * FROM inbounds WHERE id = ?`;
    const values = [id];

    db.get(sql, values, function (err, row) {
      if (err) {
        callback(err);
      } else if (!row) {
        callback(null, null);
      } else {
        const inbounds = new inbounds(row);
        callback(null, inbounds);
      }
    });
  }

  static findByPort(port) {
    const sql = `SELECT * FROM inbounds WHERE port = ?`;
    const values = port;

    return new Promise((resolve, reject) => {
      db.get(sql, values, function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = inbounds;