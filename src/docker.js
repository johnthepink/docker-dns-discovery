import DockerClient from "dockerode";
import ContainerProcessor from "./containerProcessor";

export default class Docker {

  constructor({
    store,
    TLD,
  }) {
    this.store = store;
    this.client = this.initializeDockerClient();
    this.containerProcessor = new ContainerProcessor({
      client: this.client,
      store,
      TLD,
    });
    this.listenForDockerEvents(
      this.containerProcessor.process,
    );
  }

  initializeDockerClient = () => (
    new DockerClient({
      socketPath: "/var/run/docker.sock",
    })
  );

  listenForDockerEvents = (process) => {
    this.client.getEvents({}, (err, data) => {
      if (err) {
        console.log(err.message);
        return;
      }
      data.on("data", (chunk) => {
        const { Action: action } = JSON.parse(chunk.toString("UTF-8"));
        if (["start", "stop"].includes(action)) {
          process(action);
        }
      });
    });
  }
}
