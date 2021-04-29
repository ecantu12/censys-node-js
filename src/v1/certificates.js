const CensysApiV1 = require("./api");

class CensysCertificates extends CensysApiV1 {
  constructor(apiId, apiSecret, options = {}) {
    super(apiId, apiSecret, {
      ...options,
      index: "certificates",
    });
    this.bulkPath = `/bulk/${this.INDEX}`;
    this.maxPerBulkRequest = 50;
  }

  async bulk(fingerprints) {
    const result = {};
    let start = 0;
    let end = this.maxPerBulkRequest;
    while (start < length(fingerprints)) {
      const data = { fingerprints: fingerprints.slice(start, end) };
      const res = await this.request(
        this.bulkPath,
        {},
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      result = { ...result, ...data };
      start = end;
    }
    return result;
  }
}

module.exports = CensysCertificates;
