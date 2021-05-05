const CensysApiV1 = require("./api");

class CensysData extends CensysApiV1 {
  constructor(...args) {
    super(...args);
    this._prefix = "/data";
  }

  getSeries() {
    return this.request(this._prefix);
  }

  viewSeries(seriesId) {
    return this.request(`${this._prefix}/${seriesId}`);
  }

  viewResult(seriesId, resultId) {
    return this.request(`${this._prefix}/${seriesId}/${resultId}`);
  }
}

module.exports = CensysData;
