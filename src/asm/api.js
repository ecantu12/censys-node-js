const Base = require("../base");

const BASE_URL = "https://app.censys.io/api/v1";
// const KEYWORDS = ["assets", "comments", "tags", "subdomains"];

class CensysAsmAPI extends Base {
  constructor(apiKey, options = {}) {
    super(BASE_URL, options, { "Censys-Api-Key": apiKey });
  }

  async *_get_page(path, pageNumber = 1, pageSize = 500) {
    let totalPages = Infinity;

    while (pageNumber <= totalPages) {
      const args = { pageNumber, pageSize };

      const res = await this.request(path, args);
      pageNumber = parseInt(res.pageNumber) + 1;
      totalPages = parseInt(res.totalPages);

      let keyword = "assets";
      if (path.includes("comments")) {
        keyword = "comments";
      } else if (path.includes("tags")) {
        keyword = "tags";
      } else if (path.includes("subdomains")) {
        keyword = "subdomains";
      }

      yield* res[keyword];
    }
  }

  async *_get_logbook_page(path, args = {}) {
    let endOfEvents = false;

    while (!endOfEvents) {
      let res = this.request(path, args);
      endOfEvents = res.endOfEvents;
      args = { cursor: res.nextCursor };

      yield* res["events"];
    }
  }
}

module.exports = CensysAsmAPI;
