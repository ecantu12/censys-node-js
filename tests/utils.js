const zlib = require("zlib");

const BAD_HEADERS = [
  "Set-Cookie",
  "cf-request-id",
  "Expect-CT",
  "Report-To",
  "NEL",
  "CF-RAY",
];

function decodeBuffer(fixture) {
  // Decode the hex buffer that nock made
  const response = Array.isArray(fixture.response)
    ? fixture.response.join("")
    : fixture.response;

  try {
    const decoded = Buffer.from(response, "hex");
    var unzipped = zlib.gunzipSync(decoded).toString("utf-8");
  } catch (err) {
    throw new Error(`Error decoding nock hex:\n${err}`);
  }

  return JSON.parse(unzipped);
}

function afterRecord(fixtures) {
  const normalizedFixtures = fixtures.map((fixture) => {
    fixture.response = decodeBuffer(fixture);

    let headers = fixture.rawHeaders;
    BAD_HEADERS.forEach((header) => {
      let index = headers.indexOf(header);
      if (index > -1) {
        headers.splice(index, 2);
      }
    });
    fixture.rawHeaders = headers;

    // do normalization stuff
    // Re-gzip to keep the @octokit/rest happy
    const stringified = JSON.stringify(fixture.response);
    const zipped = zlib.gzipSync(stringified);

    fixture.response = zipped.toString("hex");

    return fixture;
  });

  return normalizedFixtures;
}

module.exports = { decodeBuffer, afterRecord };
