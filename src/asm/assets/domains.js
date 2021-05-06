const Assets = require("./base");

class DomainsAssets extends Assets {
  constructor(...args) {
    super("domains", ...args);
  }

  async *getSubdomains(domain, pageNumber = 1, pageSize = null) {
    yield* this.getPage(
      `${this.basePath}/${domain}/subdomains`,
      pageNumber,
      pageSize
    );
  }
}

module.exports = DomainsAssets;
