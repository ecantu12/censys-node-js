const { Client } = require("../../src");

const c = new Client({
  apiId: process.env.API_ID,
  apiSecret: process.env.API_SECRET,
});

c.v1.ipv4.account().then(console.log);