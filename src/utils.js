const pack = require("../package.json");

const DEFAULT_OPTIONS = {
  timeout: 30,
  userAgent: `${pack.name}/${pack.version}`,
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = {
  DEFAULT_OPTIONS,
  isEmpty,
};
