const { ClientV1 } = require("./v1");
const { ClientV2 } = require("./v2");

class Client {
  constructor(apiId, apiSecret, options = {}) {
    this.v1 = new ClientV1(apiId, apiSecret, options);
    this.v2 = new ClientV2(apiId, apiSecret, options);
    if (options?.asm?.apiKey) {
      this.asm = undefined;
    }
  }
}

module.exports = {
  Client,
  ClientV1,
  ClientV2,
};
