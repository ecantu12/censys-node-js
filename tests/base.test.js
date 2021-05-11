const nock = require("nock");
const BaseApi = require("../src/base");
const consts = require("../src/consts");

describe("#censys.base", () => {
  const testUrl = "http://localhost:1234";
  const b = new BaseApi({ baseUrl: testUrl });
  const scope = nock(testUrl);

  it("headers", () => {
    const testHeaders = { randomHeader: "123" };
    const b = new BaseApi({ baseUrl: testUrl, headers: testHeaders });
    expect(b.headers).toStrictEqual({
      Accept: "application/json, */8",
      "Content-type": "application/json",
      "User-Agent": consts.USER_AGENT,
      ...testHeaders,
    });
  });

  it("error handling", async () => {
    const testEndpoint = "/test";
    scope.get(testEndpoint).reply(500, "<definitely not json>");
    await expect(b.request(testEndpoint)).rejects.toBe("Internal Server Error");
  });
});
