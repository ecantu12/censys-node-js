const CensysApiV1 = require("./api");

class CensysWebsites extends CensysApiV1 {
  constructor(apiId, apiSecret, options = {}) {
    super(apiId, apiSecret, {
      ...options,
      index: "websites",
    });
  }
}

module.exports = CensysWebsites;
