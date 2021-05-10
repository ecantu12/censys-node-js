const moment = require("moment");
const CensysAsmAPI = require("./api");

function formatSinceDate(since) {
  return moment(since).format("YYYY-MM-DD");
}
class Clouds extends CensysAsmAPI {
  constructor(args) {
    super(args);
    this.basePath = "/clouds";
  }

  getHostCounts(since) {
    return this.request(
      `${this.basePath}/hostCounts/${formatSinceDate(since)}`
    );
  }

  getDomainCounts(since) {
    return this.request(
      `${this.basePath}/domainCounts/${formatSinceDate(since)}`
    );
  }

  getObjectStoreCounts(since) {
    return this.request(
      `${this.basePath}/objectStoreCounts/${formatSinceDate(since)}`
    );
  }

  getSubdomainCounts(since) {
    return this.request(
      `${this.basePath}/subdomainCounts/${formatSinceDate(since)}`
    );
  }

  getUnknownCounts() {
    return this.request(`${this.basePath}/unknownCounts`);
  }
}

module.exports = Clouds;
