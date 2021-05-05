const nock = require("nock");
const { ClientV1 } = require("../../src");
const { API_ID, API_SECRET } = require("../consts");

const seriesJson = {
  primary_series: [],
  raw_series: [],
};
const viewJson = {
  description:
    ("The Censys IPv4 dataset provides data about the services ",
    "(e.g., HTTP, SMTP, MySQL) running on all publicly-accessible IPv4 hosts."),
  results: { historical: [] },
};
const resultJson = { files: { filename: { file_type: "data" } } };
const testSeries = "ipv4_2018";
const testResult = "20200818";

describe("#censys.v1.data", () => {
  const c = new ClientV1(API_ID, API_SECRET).data;
  const baseUrl = c.baseUrl;
  const scope = nock(baseUrl);

  it("get series", async () => {
    scope.get("/data").reply(200, seriesJson);
    const res = await c.getSeries();
    expect(res).toStrictEqual(seriesJson);
  });

  it("view series", async () => {
    scope.get(`/data/${testSeries}`).reply(200, viewJson);
    const res = await c.viewSeries(testSeries);
    expect(res).toStrictEqual(viewJson);
  });

  it("view result", async () => {
    scope.get(`/data/${testSeries}/${testResult}`).reply(200, resultJson);
    const res = await c.viewResult(testSeries, testResult);
    expect(res).toStrictEqual(resultJson);
  });
});
