const nock = require("nock");
const CensysApiV2 = require("../../src/v2/api");
const { API_ID, API_SECRET } = require("../consts");

describe("#censys.v2.api", () => {
  const c = new CensysApiV2({ apiId: API_ID, apiSecret: API_SECRET });
  const scope = nock(c.baseUrl);

  it("missing apiId and apiSecret", () => {
    expect(() => new CensysApiV2()).toThrow(
      "No API ID or API Secret configured."
    );
  });

  it("basic auth configured correctly", async () => {
    scope.get("/").basicAuth({ user: API_ID, pass: API_SECRET }).reply(200, {});
    await c.request("/");
    scope.done();
  });
});
