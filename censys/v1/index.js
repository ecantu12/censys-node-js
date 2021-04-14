const CensysApiV1 = require("./api");

class ClientV1 {
  constructor(apiId, apiSecret, options = {}) {
    this.ipv4 = new CensysApiV1(apiId, apiSecret, {
      ...options,
      index: "ipv4",
    });
  }
}

module.exports = { CensysApiV1, ClientV1 };
