const CensysApiV1 = require("./api");

class CensysWebsites extends CensysApiV1 {
  constructor(args) {
    super({ ...args, index: "websites" });
  }
}

module.exports = CensysWebsites;
