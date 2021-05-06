const nock = require("nock");
const { Client } = require("../../src");
const { API_ID, API_SECRET } = require("../consts");

const accountJson = {
  email: "test@censys.io",
  first_login: "2020-01-12 12:00:00",
  last_login: "2021-01-12 12:00:00.000000",
  login: "test@censys.io",
  quota: {
    allowance: 500000,
    resets_at: "2021-01-12 12:00:00",
    used: 0,
  },
};

describe("#censys.v1.api", () => {
  const c = new Client(API_ID, API_SECRET);
  const i = c.v1.ipv4;
  const baseUrl = i.baseUrl;
  const scope = nock(baseUrl);
  scope.persist().get("/account").reply(200, accountJson);

  it("basic auth configured correctly", async () => {
    scope.get("/").basicAuth({ user: API_ID, pass: API_SECRET }).reply(200, {});
    const res = await i.request("/");
    expect(res).toStrictEqual({});
  });

  it("get account data", async () => {
    const res = await i.account();
    expect(res).toStrictEqual(accountJson);
  });

  it("get account quota", async () => {
    const res = await i.quota();
    expect(res).toStrictEqual(accountJson.quota);
  });
});
