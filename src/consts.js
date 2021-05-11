const pack = require("../package.json");

const TIMEOUT_SECONDS = 30;
const MAX_RETRIES = 10;
const USER_AGENT = `${pack.name}/${pack.version}`;
const SEARCH_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSSSS";

module.exports = {
  TIMEOUT_SECONDS,
  MAX_RETRIES,
  USER_AGENT,
  SEARCH_DATETIME_FORMAT,
};
