const trojanLinkeMaker = (protocol, password, domain, port, remark) => {
  return `${protocol}://${password}@${domain}:${port}?security=tls&type=tcp#${remark}`;
};

module.exports = trojanLinkeMaker;
