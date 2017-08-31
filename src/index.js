import { createServer, SRVRecord } from "mname";
import docker from "./docker";
import ContainerProcessor from "./containerProcessor";
import { TLD } from "./settings";

const server = createServer();
const containerProcessor = new ContainerProcessor();

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

docker.getEvents({}, (err, data) => {
  if (err) {
    console.log(err.message);
    return;
  }
  data.on("data", (chunk) => {
    const { Action: action } = JSON.parse(chunk.toString("UTF-8"));
    if (["start", "stop"].includes(action)) {
      containerProcessor.processContainers(action);
    }
  });
});
