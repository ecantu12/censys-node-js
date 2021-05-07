const nock = require("nock");
const CensysApiV2 = require("../../src/v2/api");
const { API_ID, API_SECRET } = require("../consts");

describe("#censys.v2.api", () => {
  const c = new CensysApiV2(API_ID, API_SECRET);
  const baseUrl = c.baseUrl;
  const scope = nock(baseUrl);

  it("basic auth configured correctly", async () => {
    scope.get("/").basicAuth({ user: API_ID, pass: API_SECRET }).reply(200, {});
    await c.request("/");
    scope.done();
  });
});
