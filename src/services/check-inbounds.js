const Inbound = require("../model/inbounds.js");

const checkUser = async (idNum) => {
  Inbound.searchId(idNum);
};
