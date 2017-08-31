import compact from "lodash.compact";
import docker from "./docker";
import store from "./store";

export default class ContainerProcessor {
  getHostname = async (container) => {
    const {
      Config: {
        Hostname: hostname,
      },
    } = await docker.getContainer(container.Id).inspect();
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

  processContainers = async (action) => {
    console.log(`processing ${action}`);
    const containers = await docker.listContainers();
    const ports = await this.getNodes(containers);
    store.setPorts(ports);
    console.log(store.getPorts());
  };
}
