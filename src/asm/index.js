const Clouds = require("./clouds");
const Events = require("./events");
const Seeds = require("./seeds");
const { CertificatesAssets, DomainsAssets, HostsAssets } = require("./assets");

class ClientAsm {
  constructor(args) {
    this.certificates = new CertificatesAssets(args);
    this.clouds = new Clouds(args);
    this.domains = new DomainsAssets(args);
    this.events = new Events(args);
    this.hosts = new HostsAssets(args);
    this.seeds = new Seeds(args);
  }
}

module.exports = {
  CertificatesAssets,
  ClientAsm,
  Clouds,
  DomainsAssets,
  Events,
  HostsAssets,
  Seeds,
};
