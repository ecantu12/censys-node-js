const nock = require("nock");
const { ClientV2 } = require("../../src");
const { API_ID, API_SECRET, INVALID_DOCUMENT_ID } = require("../consts");

const viewJson = {
  result: {
    services: [
      {
        transport_protocol: "UDP",
        truncated: false,
        service_name: "DNS",
        _decoded: "dns",
        source_ip: "167.248.133.40",
        extended_service_name: "DNS",
        observed_at: "2021-04-01T13:40:03.755876935Z",
        dns: { server_type: "FORWARDING" },
        perspective_id: "PERSPECTIVE_NTT",
        port: 53,
        software: [],
      },
    ],
    ip: "8.8.8.8",
    location_updated_at: "2021-03-30T14:53:12.980328Z",
    location: {
      country: "United States",
      coordinates: { latitude: 37.751, longitude: -97.822 },
      registered_country: "United States",
      registered_country_code: "US",
      postal_code: "",
      country_code: "US",
      timezone: "America/Chicago",
      continent: "North America",
    },
    last_updated_at: "2021-04-01T14:10:10.712Z",
  },
};
const searchJson = {
  result: {
    query: "service.service_name: HTTP",
    hits: [
      {
        services: [
          { service_name: "HTTP", port: 443 },
          { service_name: "HTTP", port: 80 },
        ],
        ip: "1.0.0.0",
      },
      {
        services: [
          { service_name: "HTTP", port: 443 },
          { service_name: "HTTP", port: 80 },
        ],
        ip: "1.0.0.1",
      },
    ],
    total: 146857082,
    links: {
      prev: "eyJBZnRlciI6WyIxIiwiMS4wLjAuMCJdLCJSZXZlcnNlIjp0cnVlfQ==",
      next: "eyJBZnRlciI6WyIxIiwiMS4wLjAuNDkiXSwiUmV2ZXJzZSI6ZmFsc2V9",
    },
  },
};
const aggregateJson = {
  result: {
    total_omitted: 358388380,
    buckets: [
      { count: 47637476, key: "80" },
      { count: 35073802, key: "443" },
      { count: 17256198, key: "7547" },
      { count: 13216884, key: "22" },
    ],
    potential_deviation: 605118,
    field: "services.port",
    query: "service.service_name: HTTP",
    total: 149575980,
  },
};

describe.each([["hosts", "8.8.8.8"]])(
  "#censys.v2.client.%s",
  (index, documentId) => {
    const c = new ClientV2(API_ID, API_SECRET);
    const i = c[index];
    const scope = nock(i.baseUrl);

    it("view", async () => {
      scope.get(`/${index}/${documentId}`).reply(200, viewJson);
      const res = await i.view(documentId);
      expect(res).toMatchSnapshot();
    });

    it("view at time", async () => {
      scope
        .get(`/${index}/${documentId}`)
        .query({ at_time: "2021-03-01T00:00:00.000000Z" })
        .reply(200, viewJson);
      const res = await i.view(documentId, new Date("2021, 3, 1"));
      expect(res).toMatchSnapshot();
    });

    it("view invalid document id", async () => {
      scope.get(`/${index}/${INVALID_DOCUMENT_ID}`).reply(422, {
        status: "Unprocessable Entity",
        code: 422,
        error: "Invalid ip address",
      });
      expect.assertions(1);
      await expect(i.view(INVALID_DOCUMENT_ID)).rejects.toMatchSnapshot();
    });

    it("search", async () => {
      scope
        .get(`/${index}/search`)
        .query({
          q: "service.service_name: HTTP",
          per_page: 100,
        })
        .reply(200, searchJson);
      const results = [];
      for await (const res of i.search("service.service_name: HTTP"))
        results.push(res);
      expect(results).toMatchSnapshot();
    });

    it("search pages", async () => {
      scope
        .get(`/${index}/search`)
        .query({
          q: "service.service_name: HTTP",
          per_page: 100,
        })
        .reply(200, searchJson);
      const newHits = [
        {
          services: [
            { service_name: "HTTP", port: 443 },
            { service_name: "HTTP", port: 80 },
          ],
          ip: "1.0.0.2",
        },
      ];
      scope
        .get(`/${index}/search`)
        .query({
          q: "service.service_name: HTTP",
          per_page: 100,
          cursor: searchJson.result.links.next,
        })
        .reply(200, { result: { ...searchJson.result, hits: newHits } });
      const results = [];
      for await (const res of i.search(
        "service.service_name: HTTP",
        100,
        null,
        2
      ))
        results.push(res);
      expect(results.length).toBe(
        searchJson.result.hits.length + newHits.length
      );
      expect(results).toMatchSnapshot();
    });

    it("aggregate", async () => {
      scope
        .get(`/${index}/aggregate`)
        .query({
          field: "services.port",
          q: "service.service_name: HTTP",
          num_buckets: 50,
        })
        .reply(200, aggregateJson);
      const res = await i.aggregate(
        "service.service_name: HTTP",
        "services.port"
      );
      expect(res).toMatchSnapshot();
    });

    it("aggregate num buckets", async () => {
      scope
        .get(`/${index}/aggregate`)
        .query({
          field: "services.port",
          q: "service.service_name: HTTP",
          num_buckets: 4,
        })
        .reply(200, aggregateJson);
      const res = await i.aggregate(
        "service.service_name: HTTP",
        "services.port",
        4
      );
      expect(res).toMatchSnapshot();
    });
  }
);
