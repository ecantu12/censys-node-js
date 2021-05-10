const pack = require("../package.json");

const TIMEOUT_SECONDS = 30;
const USER_AGENT = `${pack.name}/${pack.version}`;
const SEARCH_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSSSS";

module.exports = {
  TIMEOUT_SECONDS,
  USER_AGENT,
  SEARCH_DATETIME_FORMAT,
};
