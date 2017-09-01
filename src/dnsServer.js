import {
  createServer,
  SRVRecord,
} from "mname";

import { TLD } from "./settings";

export default class DNSServer {

  constructor({ store }) {
    this.server = this.initializeServer();
    this.store = store;
  }

  initializeServer = () => {
    const server = createServer();

    server.listenUdp({ port: 9999, address: "127.0.0.1" }, () => {
      console.log("DNS server started on port 9999");
    });

    server.on("query", (query, done) => {
      const type = query.type();
      if (type !== "SRV") {
        console.log(`${type} records are not supported`);
        query.respond();
        return;
      }
      const domain = query.name();
      console.log(`DNS ${type} Query: ${domain}`);
      const target = new SRVRecord(TLD, 3434);
      query.addAnswer(domain, target);
      query.respond();
      done();
    });

    return server;
  };
}
