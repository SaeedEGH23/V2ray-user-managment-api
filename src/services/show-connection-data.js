const Inbound = require("../model/inbounds.js");

async function check(idNum) {
  let x = await Inbound.searchId(1);
  console.log("did it --------", x);
}
check;
