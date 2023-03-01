// return traffic in gb
const showTraffic = (value) => {
  if (value > 0) {
    let mb = Math.trunc(value / 1024 / 1024);
    let gb = Math.trunc(mb / 1024);
    mb = mb % 1024;
    return gb > 0
      ? JSON.stringify({ GB: gb, MB: mb })
      : JSON.stringify({ GB: 0, MB: mb });
  } else return 0;
};

module.exports = showTraffic;
