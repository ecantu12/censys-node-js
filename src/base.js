const originalFetch = require("isomorphic-unfetch");
const consts = require("./consts");
const fetch = require("fetch-retry")(originalFetch, {
  retries: consts.MAX_RETRIES,
  retryDelay: consts.TIMEOUT_SECONDS * 1000,
});
const utils = require("./utils");

class BaseApi {
  constructor({
    baseUrl,
    userAgent = consts.USER_AGENT,
    headers = {},
    timeout = consts.TIMEOUT_SECONDS,
  }) {
    this.baseUrl = baseUrl;
    this.headers = {
      Accept: "application/json, */8",
      "Content-type": "application/json",
      "User-Agent": userAgent,
      ...headers,
    };
    this.timeout = timeout;
  }

  request(endpoint, params = {}, options = {}) {
    let url = this.baseUrl + endpoint;
    if (!utils.isEmpty(params)) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }
    const config = {
      ...options,
      headers: this.headers,
      retries: consts.MAX_RETRIES,
      retryDelay: this.timeout * 1000,
    };
    return fetch(url, config).then((_res) => {
      return _res
        .json()
        .then((json) => {
          return _res.ok ? json : Promise.reject(json);
        })
        .catch((err) => {
          if (err.name === "FetchError") {
            return Promise.reject(_res.statusText);
          }
          return Promise.reject(err);
        });
    });
  }
}

module.exports = BaseApi;
