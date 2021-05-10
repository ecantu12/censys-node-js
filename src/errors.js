class MissingValues extends Error {
  constructor(missingValues = "API ID or API Secret", ...params) {
    super(...params);
    this.message = `No ${missingValues} configured.`;
  }
}

module.exports = { MissingValues };
