const { ClientV1 } = require("./v1");
const { ClientV2 } = require("./v2");
const { AsmClient } = require("./asm");

class SearchClient {
  constructor(args) {
    this.v1 = new ClientV1(args);
    this.v2 = new ClientV2(args);
  }
}

module.exports = {
  SearchClient,
  ClientV1,
  ClientV2,
  AsmClient,
};
