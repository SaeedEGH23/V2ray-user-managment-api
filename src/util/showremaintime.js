// show account remain time

const showTime = (endDate = 1679350212345) => {
  let timestamp = Date.now(),
    day,
    hours;
  timestamp = endDate - timestamp;
  hours = parseInt((timestamp / 60 / 60 / 1000) % 24);
  day = parseInt(timestamp / 24 / 60 / 60 / 1000);

  return `Account EXP after: ${day} Days and ${hours} Hours`;
};

module.exports = showTime;
