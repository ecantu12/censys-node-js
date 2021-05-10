const { SearchClient } = require("../../src");

const c = new SearchClient({
  apiId: process.env.API_ID,
  apiSecret: process.env.API_SECRET,
});

// Single page of search results
let query1 = c.v1.ipv4.search(
  "443.https.get.headers.server: Apache AND location.country: Japan",
  10
);
query1.next().then((page) => console.log(page.value));

// You can optionally restrict the (resource-specific) fields to be
// returned in the matching results. Default behavior is to return a map
// including `location` and `protocol`.
let fields = [
  "ip",
  "updated_at",
  "443.https.get.title",
  "443.https.get.headers.server",
  "443.https.get.headers.x_powered_by",
  "443.https.get.metadata.description",
  "443.https.tls.certificate.parsed.subject_dn",
  "443.https.tls.certificate.parsed.names",
  "443.https.tls.certificate.parsed.subject.common_name",
];

let query2 = c.v1.ipv4.search(
  "443.https.get.headers.server: Apache AND location.country: Japan",
  fields
);
(async function () {
  for await (let page of query2) {
    console.log(page);
  }
})();
