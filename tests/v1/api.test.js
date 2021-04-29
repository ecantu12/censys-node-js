const { setupRecorder } = require("nock-record");
const { ClientV1 } = require("../../src");
const { API_ID, API_SECRET } = require("../consts");
const { afterRecord } = require("../utils");

const record = setupRecorder();

describe("#censys.v1.client", () => {
  const c = new ClientV1(API_ID, API_SECRET);

  it("get account data", async () => {
    const { completeRecording } = await record("censys-v1-account", {
      afterRecord,
    });
    const res = await c.ipv4.account();
    completeRecording();
    expect(res).toMatchSnapshot();
  });
});
