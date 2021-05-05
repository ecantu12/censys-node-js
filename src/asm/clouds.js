const moment = require("moment");
const CensysAsmAPI = require("./api");

class Clouds extends CensysAsmAPI {
  constructor(...args) {
    super(...args);
    this.basePath = "/clouds";
  }

  getHostCounts(since) {
    const sinceStr = moment(since).format("YYYY-MM-DD");
    return this.request(`${this.basePath}/hostCounts/${sinceStr}`);
  }
}

module.exports = Clouds;
