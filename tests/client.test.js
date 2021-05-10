const { SearchClient } = require("../src");
const { API_ID, API_SECRET } = require("./consts");

describe("#censys.client", () => {
  it("constructs properly", () => {
    const client = new SearchClient({ apiId: API_ID, apiSecret: API_SECRET });
    expect(client.v1).not.toBeUndefined();
    expect(client.v2).not.toBeUndefined();
  });
});
