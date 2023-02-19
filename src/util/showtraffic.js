// return traffic in gb
const showTraffic = (value) => {
  if (value > 0) return value / 1024 / 1024 / 1024;
  else return 0;
};

module.exports = showTraffic;
