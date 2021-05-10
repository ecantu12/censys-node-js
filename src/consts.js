const pack = require("../package.json");

const TIMEOUT = 30;
const USER_AGENT = `${pack.name}/${pack.version}`;
const SEARCH_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSSSS";

module.exports = {
  TIMEOUT,
  USER_AGENT,
  SEARCH_DATETIME_FORMAT,
};
