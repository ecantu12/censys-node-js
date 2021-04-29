const { Client } = require("censys");

const c = new Client(
  "***REMOVED***",
  "***REMOVED***"
);

// c.v1.ipv4.account().then(console.log);

// c.v1.ipv4.view("8.8.8.8").then(console.log)

// c.v1.websites.view("google.com").then(console.log)

// c.v1.certificates
//   .view("82689890be745aef821ee4a988a0b81331f714d7301b288976fab36219b1f493")
//   .then(console.log);

// (async () => {
//   for await (const val of c.v2.hosts.search("service.service_name: HTTP")) {
//     console.log(val);
//   }
// })();

// c.view("8.8.8.8").then(console.log);

// c.aggregate("service.service_name: HTTP", "services.port", 5).then(console.log);
