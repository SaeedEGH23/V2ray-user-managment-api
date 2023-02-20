const trojanLinkeMaker = (connectionData) => {
  return `${connectionData.protocol}://${connectionData.pass}@${connectionData.domain}:${connectionData.cPort}?security=tls&type=tcp#${connectionData.name}`;
};

module.exports = trojanLinkeMaker;
