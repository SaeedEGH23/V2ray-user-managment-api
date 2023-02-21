const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const DBpath = process.env.DB_PATH || "/etc/x-ui/x-ui.db";
const db = new sqlite3.Database(DBpath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS inbounds (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    up INTEGER NOT NULL,
    down INTEGER NOT NULL,
    total INTEGER NOT NULL,
    remark TEXT NOT NULL,
    enable BOOLEAN NOT NULL,
    expiry_time INTEGER NOT NULL,
    listen NULL,
    port INTEGER NOT NULL UNIQUE,
    protocol TEXT NOT NULL CHECK(protocol IN ('tcp', 'kcp', 'ws', 'h2', 'quic', 'trojan', 'vmess')),
    settings TEXT NOT NULL,
    stream_settings TEXT NOT NULL,
    tag TEXT NOT NULL UNIQUE,
    sniffing TEXT NOT NULL
  )`);
});

class inbounds {
  constructor({
    id,
    user_id,
    up,
    down,
    total,
    remark,
    enable,
    expiry_time,
    listen,
    port,
    protocol,
    settings,
    stream_settings,
    tag,
    sniffing,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.up = up;
    this.down = down;
    this.total = total;
    this.remark = remark;
    this.enable = enable;
    this.expiry_time = expiry_time;
    this.listen = listen;
    this.port = port;
    this.protocol = protocol;
    this.settings = settings;
    this.stream_settings = stream_settings;
    this.tag = tag;
    this.sniffing = sniffing;
  }

  async save() {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO inbounds (id, user_id, up, down, total, remark, enable, expiry_time, listen, port, protocol, settings, stream_settings, tag, sniffing)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        this.id,
        this.user_id,
        this.up,
        this.down,
        this.total,
        this.remark,
        this.enable,
        this.expiry_time,
        this.listen,
        this.port,
        this.protocol,
        this.settings,
        this.stream_settings,
        this.tag,
        this.sniffing,
      ];

      db.run(sql, values, (err) => {
        if (err) {
          // callback(err);
          return reject(err.message);
        } else {
          // callback(null, this.lastID);
          console.log(`new Data inserted with id: ${this.id}`);
          return resolve(this.id);
        }
      });
    });
  }

  static async findById(id) {
    const sql = `SELECT * FROM inbounds WHERE id = ?`;
    const values = id;

    return new Promise((resolve, reject) => {
      db.get(sql, values, function (err, row) {
        if (err) {
          reject(err.message);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async findByPort(port) {
    const sql = `SELECT * FROM inbounds WHERE port = ?`;
    const values = port;

    return new Promise((resolve, reject) => {
      db.get(sql, values, function (err, row) {
        if (err) {
          reject(err.message);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async findByRemark(remark) {
    const sql = `SELECT * FROM inbounds WHERE remark = ?`;
    const values = remark;

    return new Promise((resolve, reject) => {
      db.get(sql, values, function (err, row) {
        if (err) {
          reject(err.message);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = inbounds;
