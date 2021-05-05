const CensysAsmAPI = require("./api");

class Events extends CensysAsmAPI {
  constructor(...args) {
    super(...args);
    this.basePath = "/logbook";
  }

  async getCursor(start = null, filters = null) {
    const data = {};
    if (typeof start === "number") {
      data["idFrom"] = start;
    } else if (start) {
      data["dateFrom"] = start;
    }
    if (filters) {
      data["filter"] = { type: filters };
    }

    const res = await this.request(
      this.basePath + "-cursor",
      {},
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return res.cursor;
  }

  async *getEvents(cursor = null) {
    const args = {};
    if (cursor) {
      args["cursor"] = cursor;
    }

    yield* this.getLogbookPage(this.basePath, args);
  }
}

module.exports = Events;
