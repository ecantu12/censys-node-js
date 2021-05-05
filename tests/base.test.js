const nock = require("nock");
const Base = require("../src/base");
const utils = require("../src/utils");

describe("#censys.base", () => {
  const testUrl = "http://localhost:1234";

  it("options", () => {
    const testOptions = { randomOption: "123" };
    const b = new Base(testUrl, testOptions);
    expect(b.options).toStrictEqual({
      ...testOptions,
      ...utils.DEFAULT_OPTIONS,
    });
  });

  it("headers", () => {
    const testHeaders = { randomHeader: "123" };
    const b = new Base(testUrl, null, testHeaders);
    expect(b.headers).toStrictEqual({
      Accept: "application/json, */8",
      "User-Agent": utils.DEFAULT_OPTIONS.userAgent,
      ...testHeaders,
    });
  });

  it("error handling", async () => {
    const b = new Base(testUrl);
    const scope = nock(testUrl);
    const testEndpoint = "/test";
    scope.get(testEndpoint).reply(500, "<definitely not json>");
    await expect(b.request(testEndpoint)).rejects.toBe("Internal Server Error");
  });
});
