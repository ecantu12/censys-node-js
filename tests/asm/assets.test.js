const nock = require("nock");
const { ClientAsm } = require("../../src/asm");
const { API_Key } = require("../consts");

const testAssetIds = {
  hosts: "3.12.122.3",
  certificates:
    "0006afc1ddc8431aa57c812adf028ab4f168b25bf5f06e94af86edbafa88dfe0",
  domains: "amazonaws.com",
};
const testCommentId = 3;
const testCommentText = "This is a test comment";
const testTagName = "asset-test-tag";
const testTagColor = "#4287f5";
const testJson = {
  pageNumber: 1,
  totalPages: 1,
  assets: ["asset1", "asset2", "asset3"],
};
const testSubdomains = {
  pageNumber: 1,
  totalPages: 1,
  subdomains: ["asset1", "asset2", "asset3"],
};

describe.each([["hosts"], ["certificates"], ["domains"]])(
  "#censys.asm.assets.%s",
  (assetType) => {
    const c = new ClientAsm(API_Key);
    const i = c[assetType];
    const baseUrl = i.baseUrl;
    const assetUrl = `/assets/${assetType}`;
    const scope = nock(baseUrl);
    const testAssetId = testAssetIds[assetType];

    it("get assets", async () => {
      scope
        .get(`${assetUrl}`)
        .query({ pageNumber: 1, pageSize: 500 })
        .reply(200, testJson);
      const results = [];
      for await (const res of i.getAssets()) results.push(res);
      expect(results).toStrictEqual(testJson.assets);
    });

    it("get assets multi page", async () => {
      const testAssets1 = { ...testJson, totalPages: 2 };
      scope
        .get(`${assetUrl}`)
        .query({ pageNumber: 1, pageSize: 500 })
        .reply(200, testAssets1);
      const assets2 = ["asset4", "asset5"];
      scope
        .get(`${assetUrl}`)
        .query({ pageNumber: 2, pageSize: 500 })
        .reply(200, { ...testAssets1, pageNumber: 2, assets: assets2 });
      const results = [];
      for await (const res of i.getAssets()) results.push(res);
      expect(results).toStrictEqual([...testJson.assets, ...assets2]);
    });

    it("get assets with page size", async () => {
      scope
        .get(`${assetUrl}`)
        .query({ pageNumber: 1, pageSize: 100 })
        .reply(200, testJson);
      const results = [];
      for await (const res of i.getAssets(1, 100)) results.push(res);
      expect(results).toStrictEqual(testJson.assets);
    });

    it("get asset by id", async () => {
      scope.get(`${assetUrl}/${testAssetId}`).reply(200, testJson);
      const res = await i.getAssetById(testAssetId);
      expect(res).toStrictEqual(testJson);
    });

    it("get comment by id", async () => {
      scope
        .get(`${assetUrl}/${testAssetId}/comments/${testCommentId}`)
        .reply(200, testJson);
      const res = await i.getCommentById(testAssetId, testCommentId);
      expect(res).toStrictEqual(testJson);
    });

    it("add comment", async () => {
      scope
        .post(`${assetUrl}/${testAssetId}/comments`, {
          markdown: testCommentText,
        })
        .reply(200, testJson);
      const res = await i.addComment(testAssetId, testCommentText);
      expect(res).toStrictEqual(testJson);
    });

    it("add tag", async () => {
      scope
        .post(`${assetUrl}/${testAssetId}/tags`, {
          name: testTagName,
        })
        .reply(200, testJson);
      const res = await i.addTag(testAssetId, testTagName);
      expect(res).toStrictEqual(testJson);
    });

    it("add tag with color", async () => {
      scope
        .post(`${assetUrl}/${testAssetId}/tags`, {
          name: testTagName,
          color: testTagColor,
        })
        .reply(200, testJson);
      const res = await i.addTag(testAssetId, testTagName, testTagColor);
      expect(res).toStrictEqual(testJson);
    });

    it("delete tag", async () => {
      scope
        .delete(`${assetUrl}/${testAssetId}/tags/${testTagName}`)
        .reply(200, testJson);
      const res = await i.deleteTag(testAssetId, testTagName);
      expect(res).toStrictEqual(testJson);
    });
  }
);

describe("#censys.asm.assets.domains", () => {
  const c = new ClientAsm(API_Key);
  const i = c.domains;
  const baseUrl = i.baseUrl;
  const assetUrl = "/assets/domains";
  const scope = nock(baseUrl);
  it("get subdomains", async () => {
    scope
      .get(`${assetUrl}/${testAssetIds.domains}/subdomains`)
      .query({ pageNumber: 1, pageSize: 500 })
      .reply(200, testSubdomains);
    const results = [];
    for await (const res of i.getSubdomains(testAssetIds.domains))
      results.push(res);
    expect(results).toStrictEqual(testSubdomains.subdomains);
  });
});
