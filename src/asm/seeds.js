const CensysAsmAPI = require("./api");

class Seeds extends CensysAsmAPI {
  constructor(...args) {
    super(...args);
    this.basePath = "/seeds";
  }

  async getSeeds(seedType = null) {
    const args = {};
    if (seedType) {
      args["type"] = seedType;
    }

    const res = await this.request(this.basePath, args);
    return res.seeds;
  }

  getSeedById(seedId) {
    return this.request(`${this.basePath}/${seedId}`);
  }

  addSeeds(seeds, force = null) {
    const args = {};
    if (force != null) {
      args["force"] = force;
    }
    return this.request(this.basePath, args, {
      method: "POST",
      body: JSON.stringify({ seeds }),
    });
  }

  replaceSeedsByLabel(label, seeds, force = null) {
    const args = { label };
    if (force != null) {
      args["force"] = force;
    }
    return this.request(this.basePath, args, {
      method: "PUT",
      body: JSON.stringify({ seeds }),
    });
  }

  deleteSeedsByLabel(label) {
    return this.request(this.basePath, { label }, { method: "DELETE" });
  }

  deleteSeedById(seedId) {
    return this.request(`${this.basePath}/${seedId}`, {}, { method: "DELETE" });
  }
}

module.exports = Seeds;
