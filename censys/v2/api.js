const Base = require("../base");

class CensysApiV2 extends Base {
  constructor(apiId, apiSecret, options = {}) {
    const auth =
      "Basic " + Buffer.from(apiId + ":" + apiSecret).toString("base64");
    const headers = { Authorization: auth };
    super("https://search.censys.io/api/v2/", options, headers);

    this.INDEX = options.index || "hosts";
    this.searchPath = `${this.INDEX}/search`;
    this.aggregatePath = `${this.INDEX}/aggregate`;
  }

  async *search(query, perPage = null, cursor = null, pages = 1) {
    const args = { q: query };
    if (perPage) {
      args["per_page"] = perPage;
    }
    let page = 1;
    while (page <= pages) {
      if (cursor) {
        args["cursor"] = cursor;
      }

      const res = await this.request(this.searchPath, args);
      page++;
      let result = res.result;
      cursor = result.links.next;
      yield* result.hits;
    }
  }

  async view(documentId, atTime = null) {
    const args = {};
    if (atTime) {
      args["at_time"] = atTime;
    }

    const res = await this.request(this.INDEX + "/" + documentId, args);
    return res.result;
  }

  async aggregate(query, field, numBuckets = 50) {
    const args = { q: query, field, num_buckets: numBuckets };
    const res = await this.request(this.aggregatePath, args);
    return res.result;
  }
}

module.exports = CensysApiV2;
