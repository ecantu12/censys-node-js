const CensysCertificates = require("./certificates");
const CensysData = require("./data");
const CensysIPv4 = require("./ipv4");
const CensysWebsites = require("./websites");

class ClientV1 {
  constructor(...args) {
    this.ipv4 = new CensysIPv4(...args);
    this.certificates = new CensysCertificates(...args);
    this.websites = new CensysWebsites(...args);
    this.data = new CensysData(...args);
  }
}

module.exports = {
  ClientV1,
  CensysIPv4,
  CensysCertificates,
  CensysWebsites,
  CensysData,
};
