const nock = require("nock");
const { Client } = require("../../src");
const { API_ID, API_SECRET } = require("../consts");

describe("#censys.v1.api", () => {
  const c = new Client(API_ID, API_SECRET);
  const i = c.v1.ipv4;
  const baseUrl = i.baseUrl;
  const scope = nock(baseUrl);
  scope
    .persist()
    .get("/account")
    .reply(200, {
      email: "test@censys.io",
      first_login: "2020-01-12 12:00:00",
      last_login: "2021-01-12 12:00:00.000000",
      login: "test@censys.io",
      quota: {
        allowance: 500000,
        resets_at: "2021-01-12 12:00:00",
        used: 0,
      },
    });

  it("get account data", async () => {
    const res = await i.account();
    expect(res).toMatchSnapshot();
  });

  it("get account quota", async () => {
    const res = await i.quota();
    expect(res).toMatchSnapshot();
  });
});
