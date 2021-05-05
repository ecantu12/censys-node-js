const nock = require("nock");
const { ClientV1 } = require("../../src");
const { API_ID, API_SECRET, INVALID_DOCUMENT_ID } = require("../consts");

const maxRecords = 10;
const viewJson = {
  document: "test_id",
  tags: ["http", "https"],
  ports: [80, 443],
  protocols: ["443/https_www", "80/http", "80/http_www", "443/https"],
};
const searchJson = {
  status: "ok",
  results: [{}],
  metadata: {
    count: 10000,
    query: "*",
    page: 1,
    pages: 1,
  },
};
const reportJson = {
  status: "ok",
  results: [
    { key: "cloudflare", doc_count: 199512 },
    { key: "Apache", doc_count: 150828 },
    { key: "nginx", doc_count: 138877 },
  ],
  metadata: {
    count: 958646,
    backend_time: 172,
    nonnull_count: 813207,
    other_result_count: 323990,
    buckets: 3,
    error_bound: 6519,
    query: "*",
  },
};

describe.each([
  [
    "certificates",
    "fce621c0dc1c666d03d660472f636ce91e66e96460545f0da7eb1a24873e2f70",
  ],
  ["ipv4", "8.8.8.8"],
  ["websites", "google.com"],
])("#censys.v1.client.%s", (index, documentId) => {
  const c = new ClientV1(API_ID, API_SECRET);
  const i = c[index];
  const scope = nock(i.baseUrl);

  it("view", async () => {
    scope
      .get(`/view/${index}/${documentId}`)
      .reply(200, { ...viewJson, document: documentId });
    const res = await i.view(documentId);
    expect(res).toMatchSnapshot();
  });

  it("view invalid document id", async () => {
    scope.get(`/view/${index}/${INVALID_DOCUMENT_ID}`).reply(404, {
      status: "error",
      error_type: "unknown",
      error: `The value ${INVALID_DOCUMENT_ID} is not a valid document.`,
    });
    expect.assertions(1);
    await expect(i.view(INVALID_DOCUMENT_ID)).rejects.toMatchSnapshot();
  });

  it("search", async () => {
    scope
      .post(`/search/${index}`)
      .reply(200, { ...searchJson, results: [{ document: documentId }] });
    const results = [];
    for await (const res of i.search("*")) results.push(res);
    expect(results).toMatchSnapshot();
  });

  it("search max records", async () => {
    const sampleResults = [];
    for (let i = 0; i < maxRecords + 5; i++) {
      sampleResults.push({ document: documentId + i });
    }
    scope
      .post(`/search/${index}`)
      .reply(200, { ...searchJson, results: sampleResults });
    const results = [];
    for await (const res of i.search("*", [], 1, maxRecords)) results.push(res);
    expect(results.length).toBe(maxRecords);
    expect(results).toMatchSnapshot();
  });

  it("report", async () => {
    scope.post(`/report/${index}`).reply(200, reportJson);
    const res = await i.report("*");
    expect(res).toMatchSnapshot();
  });
});
