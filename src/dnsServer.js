// @flow

import {
  createServer,
  SRVRecord,
} from "mname";

export default class DNSServer {
  getRecordFor: Function;
  server: any;
  store: any;
  TLD: string;

  constructor({
    getRecordFor,
    store,
    TLD,
  }: {
    getRecordFor: Function,
    store: any,
    TLD: string,
  }) {
    this.getRecordFor = getRecordFor;
    this.server = this.initializeServer();
    this.store = store;
    this.TLD = TLD;
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
      const result = this.getRecordFor(domain);
      if (result) {
        const target = new SRVRecord(this.TLD, result.publicPort);
        query.addAnswer(result.hostname, target);
      }
      query.respond();
      done();
    });

    return server;
  };
}
