// return traffic in gb
const showTraffic = (value) => {
  if (value > 0) {
    let MB = Math.trunc(value / 1024 / 1024);
    let GB = Math.trunc(MB / 1024);
    MB = MB % 1024;
    return GB > 0 ? `${GB}.${Math.trunc(MB / 10)}GB` : `${MB}MB`;
  } else return 0;
};

module.exports = showTraffic;
