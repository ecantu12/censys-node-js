const Assets = require("./base");

class HostsAssets extends Assets {
  constructor(args) {
    super("hosts", args);
  }
}

module.exports = HostsAssets;
