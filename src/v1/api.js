const Base = require("../base");

const BASE_URL = "https://censys.io/api/v1";

class CensysApiV1 extends Base {
  constructor(apiId, apiSecret, options = {}) {
    const auth =
      "Basic " + Buffer.from(apiId + ":" + apiSecret).toString("base64");
    const headers = { Authorization: auth };
    super(BASE_URL, options, headers);

    this.INDEX = options.index || "ipv4";
    this.searchPath = `/search/${this.INDEX}`;
    this.viewPath = `/view/${this.INDEX}`;
    this.reportPath = `/report/${this.INDEX}`;
  }

  async account() {
    return await this.request("/account");
  }

  async quota() {
    const res = await this.account();
    return res.quota;
  }

  async *search(
    query,
    fields = [],
    page = 1,
    maxRecords = null,
    flatten = false
  ) {
    let pages = Infinity;
    const data = { query, page, fields, flatten };

    let count = 0;
    while (page <= pages) {
      const res = await this.request(
        this.searchPath,
        {},
        { method: "POST", body: JSON.stringify(data) }
      );
      pages = res.metadata.pages;
      page++;
      data["page"] = page;

      for (const r of res.results) {
        yield r;
        count++;
        if (maxRecords && count >= maxRecords) return;
      }
    }
  }

  view(documentId) {
    return this.request(this.viewPath + "/" + documentId);
  }

  report(query, field, numBuckets = 50) {
    const data = { query, field, buckets: numBuckets };
    return this.request(
      this.reportPath,
      {},
      { method: "POST", body: JSON.stringify(data) }
    );
  }
}

module.exports = CensysApiV1;
