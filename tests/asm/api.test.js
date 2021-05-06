const nock = require("nock");
const { Client } = require("../../src");
const { API_KEY } = require("../consts");

describe("#censys.asm.api", () => {
  const c = new Client(null, null, { asm: { apiKey: API_KEY } });
  const i = c.asm.events;
  const baseUrl = i.baseUrl;
  const scope = nock(baseUrl);

  it("sets api key header", async () => {
    const testJson = { status: "checking header" };
    scope.matchHeader("Censys-Api-Key", API_KEY).get("/").reply(200, testJson);
    const res = await i.request("/");
    expect(res).toStrictEqual(testJson);
  });

  it.each([["assets"], ["comments"], ["tags"], ["subdomains"]])(
    "get page keywords",
    async (keyword) => {
      const testPath = `/${keyword}`;
      const testJson = {
        pageNumber: 1,
        totalPages: 1,
      };
      testJson[keyword] = ["test1", "test2", "test3"];
      scope
        .get(testPath)
        .query({ pageNumber: 1, pageSize: 500 })
        .reply(200, testJson);
      const results = [];
      for await (const res of i.getPage(testPath)) results.push(res);
      expect(results).toStrictEqual(testJson[keyword]);
    }
  );
});
