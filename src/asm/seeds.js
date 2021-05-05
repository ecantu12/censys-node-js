const CensysAsmAPI = require("./api");

class Seeds extends CensysAsmAPI {
  constructor(...args) {
    super(...args);
    this.basePath = "/seeds";
  }
}

module.exports = Seeds;
