import { createServer, SRVRecord } from "mname";
import Docker from "dockerode";
import { TLD } from "./settings";

const server = createServer();

server.listenUdp({ port: 9999, address: "127.0.0.1" }, () => {
  console.log("DNS server started on port 9999"); // eslint-disable-line no-console
});

server.on("query", (query, done) => {
  const type = query.type();
  if (type !== "SRV") {
    console.log(`${type} records are not supported`); // eslint-disable-line no-console
    query.respond();
    return;
  }
  const domain = query.name();
  console.log(`DNS ${type} Query: ${domain}`); // eslint-disable-line no-console
  const target = new SRVRecord(TLD, 3434);
  query.addAnswer(domain, target);
  query.respond();
  done();
});

const docker = new Docker({ socketPath: "/var/run/docker.sock" });
docker.getEvents({}, (err, data) => {
  if (err) {
    console.log(err.message);
    return;
  }
  data.on("data", (chunk) => {
    const event = JSON.parse(chunk.toString("UTF-8"));
    if (event.Action === "start") {
      console.log(`Starting ${event.Actor.Attributes.name}`);
      const container = docker.getContainer(event.id);
      container.inspect((err, data) => {
        console.log(data.NetworkSettings.Ports);
      });
    }
    if (event.Action === "die") {
      console.log(`Stopping ${event.Actor.Attributes.name}`);
    }
  });
});
