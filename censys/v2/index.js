const CensysApiV2 = require("./api");

class ClientV2 {
  constructor(apiId, apiSecret, options = {}) {
    this.hosts = new CensysApiV2(apiId, apiSecret, {
      ...options,
      index: "hosts",
    });
  }
}

module.exports = { CensysApiV2, ClientV2 };
