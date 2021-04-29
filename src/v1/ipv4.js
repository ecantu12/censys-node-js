const CensysApiV1 = require("./api");

class CensysIPv4 extends CensysApiV1 {
  constructor(apiId, apiSecret, options = {}) {
    super(apiId, apiSecret, {
      ...options,
      index: "ipv4",
    });
  }
}

module.exports = CensysIPv4;
