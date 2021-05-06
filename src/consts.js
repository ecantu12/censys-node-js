const pack = require("../package.json");

const DEFAULT_OPTIONS = {
  timeout: 30,
  userAgent: `${pack.name}/${pack.version}`,
};
const SEARCH_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSSSS";

module.exports = {
  DEFAULT_OPTIONS,
  SEARCH_DATETIME_FORMAT,
};
