const CensysApiV2 = require("./api");

class CensysHosts extends CensysApiV2 {
  constructor(apiId, apiSecret, options = {}) {
    super(apiId, apiSecret, {
      ...options,
      index: "hosts",
    });
  }
}

module.exports = CensysHosts;
