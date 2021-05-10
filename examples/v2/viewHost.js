const { Client } = require("../../src");

const c = new Client({
  apiId: process.env.API_ID,
  apiSecret: process.env.API_SECRET,
});

(async () => {
  const res = await c.v2.hosts.view("8.8.8.8", new Date("2021, 3, 1"));
  console.log(res);
})();
