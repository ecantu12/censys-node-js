const fetch = require("isomorphic-unfetch");
const consts = require("./consts");
const utils = require("./utils");

class Base {
  constructor(baseUrl, options = {}, headers = {}) {
    this.baseUrl = baseUrl;
    this.options = { ...consts.DEFAULT_OPTIONS, ...options };
    this.headers = {
      Accept: "application/json, */8",
      "User-Agent": this.options.userAgent,
      ...headers,
    };
  }

  request(endpoint, params = {}, options = {}) {
    let url = this.baseUrl + endpoint;
    if (!utils.isEmpty(params)) {
      let searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }
    const headers = {
      "Content-type": "application/json",
      ...this.headers,
    };
    const config = {
      ...options,
      headers,
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

module.exports = Base;
