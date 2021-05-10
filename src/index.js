const { ClientV1 } = require("./v1");
const { ClientV2 } = require("./v2");
const { ClientAsm } = require("./asm");

class Client {
  constructor(args) {
    this.v1 = new ClientV1(args);
    this.v2 = new ClientV2(args);
  }
}

module.exports = {
  Client,
  ClientV1,
  ClientV2,
  ClientAsm,
};
