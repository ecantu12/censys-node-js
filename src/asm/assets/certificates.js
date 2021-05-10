const Assets = require("./base");

class CertificatesAssets extends Assets {
  constructor(args) {
    super("certificates", args);
  }
}

module.exports = CertificatesAssets;
