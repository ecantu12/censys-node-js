const CensysHosts = require("./hosts");

class ClientV2 {
  constructor(args) {
    this.hosts = new CensysHosts(args);
  }
}

module.exports = { ClientV2, CensysHosts };
