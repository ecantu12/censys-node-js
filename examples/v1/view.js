const { SearchClient } = require("../../src");

const c = new SearchClient({
  apiId: process.env.API_ID,
  apiSecret: process.env.API_SECRET,
});

c.v1.ipv4.view("8.8.8.8").then(console.log);

c.v1.websites.view("google.com").then(console.log);

c.v1.certificates
  .view("82689890be745aef821ee4a988a0b81331f714d7301b288976fab36219b1f493")
  .then(console.log);
