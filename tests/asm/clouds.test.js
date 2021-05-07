const nock = require("nock");
const { ClientAsm } = require("../../src/asm");
const { API_KEY } = require("../consts");

const hostCountJson = {
  totalAssetCount: 0,
  totalNewAssetCount: 0,
  totalCloudAssetCount: 0,
  totalCloudNewAssetCount: 0,
  assetCountByProvider: [
    { cloudProvider: "string", assetCount: 0, newAssetCount: 0 },
  ],
};

describe("#censys.asm.clouds", () => {
  const c = new ClientAsm({apiKey: API_KEY});
  const i = c.clouds;
  const scope = nock(i.baseUrl);

  it.each([["2021-01-01", "2021-01-01"]])(
    "get host counts",
    async (since, sinceStr) => {
      scope.get(`/clouds/hostCounts/${sinceStr}`).reply(200, hostCountJson);
      const res = await i.getHostCounts(since);
      expect(res).toStrictEqual(hostCountJson);
    }
  );
});
