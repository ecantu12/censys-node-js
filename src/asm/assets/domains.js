const Assets = require("./base");

class DomainsAssets extends Assets {
  constructor(...args) {
    super("domains", ...args);
  }
}

module.exports = DomainsAssets;
