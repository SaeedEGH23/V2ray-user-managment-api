// This module created for set time to all connections for first usage it will run with fix period time
//if you want use run it splite from main api
// before run it install dependency with "npm install node-cron"
const cron = require("node-cron");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const tableName = "inbounds";
const dbPath = process.env.DB_PATH || "./x-ui.db"; // set db path here
const period = 1; //it means set 1 month to connection which started use

// Connect to the SQLite3 database
const db = new sqlite3.Database(dbPath);

const setTimeStamp = (month) => {
  if (month == 0) return 0;
  let timestamp = Date.now();
  timestamp += month * (30 * 24 * 60 * 60 * 1000);
  let d = new Date();
  d.setTime(timestamp);

  console.log(d);
  return timestamp;
};

// Define the cron job,this cron job run every 4 hourse
cron.schedule("0 */4 * * *", () => {
  // Check the fields in the database
  db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }

    // Check if the first field is 1, the second field is greater than 0, and the third field is 0

    let i = 0;
    rows.forEach((row) => {
      if (row.enable === 1 && row.down > 5000 && row.expiry_time === 0) {
        console.log(`${++i} ---  ${row.id} ----- ${row.remark}`);

        db.run(
          `UPDATE ${tableName} SET expiry_time = ? WHERE id = ?`,
          [setTimeStamp(period), row.id],
          (err) => {
            if (err) {
              console.error(err.message);
              return;
            }
            console.log(
              `Updated expTime of${row.id} to ${setTimeStamp(period)}`
            );
          }
        );
      } else console.log(`not id : ${row.id} -- remark : ${row.remark}`);
    });
  });
});
