const CensysApiV2 = require("./api");

class CensysHosts extends CensysApiV2 {
  constructor(args) {
    super({ ...args, index: "hosts" });
  }
}

module.exports = CensysHosts;
