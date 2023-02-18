// It's return your traffic in bytes input with mb or gb can be sett usage: setTraffic('mb',300)
const setTraffic = (unit, value) => {
  if (unit == "mb") return value * 1024 * 1024;
  else if (unit == "gb") return value * 1024 * 1024 * 1024;
  else throw new Error("Unit is not defined");
};

module.exports = setTraffic;
