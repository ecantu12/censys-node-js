const BaseApi = require("../base");
const { MissingAuthError } = require("../errors");

const BASE_URL = "https://censys.io/api/v1";

class CensysApiV1 extends BaseApi {
  constructor({ apiId, apiSecret, index = "ipv4" } = {}) {
    if (!apiId || !apiSecret) {
      throw new MissingAuthError();
    }
    const auth =
      "Basic " + Buffer.from(apiId + ":" + apiSecret).toString("base64");
    super({ baseUrl: BASE_URL, headers: { Authorization: auth } });

    this.INDEX = index;
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
    maxRecords = null,
    page = 1,
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
