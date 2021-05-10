const BaseApi = require("../base");
const { MissingAuthError } = require("../errors");

const BASE_URL = "https://app.censys.io/api/v1";
// const KEYWORDS = ["assets", "comments", "tags", "subdomains"];

class CensysAsmAPI extends BaseApi {
  constructor({ apiKey } = {}) {
    if (!apiKey) {
      throw new MissingAuthError("API Key");
    }
    super({ baseUrl: BASE_URL, headers: { "Censys-Api-Key": apiKey } });
  }

  async *getPage(path, pageNumber = 1, pageSize = null) {
    if (pageSize == null) {
      pageSize = 500;
    }

    let keyword = "assets";
    if (path.includes("comments")) {
      keyword = "comments";
    } else if (path.includes("tags")) {
      keyword = "tags";
    } else if (path.includes("subdomains")) {
      keyword = "subdomains";
    }

    let totalPages = Infinity;
    while (pageNumber <= totalPages) {
      const args = { pageNumber, pageSize };

      const res = await this.request(path, args);
      pageNumber = parseInt(res.pageNumber) + 1;
      totalPages = parseInt(res.totalPages);

      yield* res[keyword];
    }
  }

  async *getLogbookPage(path, args) {
    let endOfEvents = false;

    while (!endOfEvents) {
      let res = await this.request(path, args);
      endOfEvents = res.endOfEvents;
      args = { ...args, cursor: res.nextCursor };

      yield* res.events;
    }
  }
}

module.exports = CensysAsmAPI;
