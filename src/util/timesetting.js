// It's return month's in int set it for expire time from now with functionCall([month number] || default 1)

const timeSet = function (month = 1) {
  let timestamp = Date.now();
  timestamp += month * (30 * 24 * 60 * 60 * 1000);
  let d = new Date();
  d.setTime(timestamp);

  console.log(d);
  return timestamp;
};

module.exports = timeSet;
