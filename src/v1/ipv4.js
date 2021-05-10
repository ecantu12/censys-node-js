const CensysApiV1 = require("./api");

class CensysIPv4 extends CensysApiV1 {
  constructor(args) {
    super({ ...args, index: "ipv4" });
  }
}

module.exports = CensysIPv4;
