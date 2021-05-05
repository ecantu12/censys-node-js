const nock = require("nock");
const { ClientAsm } = require("../../src/asm");
const { API_Key } = require("../consts");

const testCursor = "123456789";
const eventsJson = {
  nextCursor: testCursor + 1,
  endOfEvents: true,
  events: ["test1", "test2"],
};

describe("#censys.asm.events", () => {
  const c = new ClientAsm(API_Key);
  const i = c.events;
  const baseUrl = i.baseUrl;
  const scope = nock(baseUrl);

  it("get cursor", async () => {
    scope.post("/logbook-cursor").reply(200, { cursor: testCursor });
    const res = await i.getCursor();
    expect(res).toBe(testCursor);
  });

  it("get cursor id from", async () => {
    const testIdFrom = 123;
    scope
      .post("/logbook-cursor", { idFrom: testIdFrom })
      .reply(200, { cursor: testCursor });
    const res = await i.getCursor(testIdFrom);
    expect(res).toBe(testCursor);
  });

  it("get cursor date from", async () => {
    const testDateFrom = "123";
    scope
      .post("/logbook-cursor", { dateFrom: testDateFrom })
      .reply(200, { cursor: testCursor });
    const res = await i.getCursor(testDateFrom);
    expect(res).toBe(testCursor);
  });

  it("get cursor filters", async () => {
    const testFilters = ["test1", "test2"];
    scope
      .post("/logbook-cursor", { filter: { type: testFilters } })
      .reply(200, { cursor: testCursor });
    const res = await i.getCursor(null, testFilters);
    expect(res).toBe(testCursor);
  });

  it("get events", async () => {
    scope.get("/logbook").reply(200, eventsJson);
    const results = [];
    for await (const res of await i.getEvents()) results.push(res);
    expect(results).toStrictEqual(eventsJson.events);
  });

  it("get events with cursor", async () => {
    scope.get("/logbook").query({ cursor: testCursor }).reply(200, eventsJson);
    const results = [];
    for await (const res of await i.getEvents(testCursor)) results.push(res);
    expect(results).toStrictEqual(eventsJson.events);
  });
});
