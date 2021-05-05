const Clouds = require("./clouds");
const Events = require("./events");
const Seeds = require("./seeds");

class ClientAsm {
  constructor(...args) {
    this.seeds = new Seeds(...args);
    this.hosts = null;
    this.certificates = null;
    this.domains = null;
    this.events = new Events(...args);
    this.clouds = new Clouds(...args);
  }
}

module.exports = {
  ClientAsm,
  Clouds,
  Events,
  Seeds,
};
