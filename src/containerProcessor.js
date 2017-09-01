import compact from "lodash.compact";

export default class ContainerProcessor {

  constructor({
    client,
    store,
  }) {
    this.client = client;
    this.store = store;
  }

  getHostname = async (container) => {
    const {
      Config: {
        Hostname: hostname,
      },
    } = await this.client.getContainer(container.Id).inspect();
    return hostname;
  };

  getPublicPort = (container) => {
    const { Ports: ports } = container;
    if (ports.length === 0) return null;
    const { PublicPort: publicPort } = ports[0];
    if (!publicPort) return null;
    return publicPort;
  };

  getNode = async (container) => {
    const publicPort = this.getPublicPort(container);
    if (!publicPort) return null;
    const hostname = await this.getHostname(container);
    return {
      hostname,
      publicPort,
    };
  };

  getNodes = async (containers) => {
    const nodes = await Promise.all(
      containers.map(container => (
        this.getNode(container)
      )),
    );
    return compact(nodes);
  };

  process = async (action) => {
    console.log(`processing ${action}`);
    const containers = await this.client.listContainers();
    const ports = await this.getNodes(containers);
    this.store.setPorts(ports);
    console.log(this.store.getPorts());
  };
}
