// @flow

import DockerClient from "dockerode";
import ContainerProcessor from "./containerProcessor";

export default class Docker {
  store: any;
  client: any;
  containerProcessor: any;

  constructor({
    store,
    TLD,
  }: {
    store: mixed,
    TLD: string,
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

  listenForDockerEvents = (process: Function) => {
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
