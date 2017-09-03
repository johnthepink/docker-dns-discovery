// @flow

import compact from "lodash.compact";

export default class ContainerProcessor {
  client: any;
  store: any;
  TLD: string;

  constructor({
    client,
    store,
    TLD,
  }: {
    client: any,
    store: any,
    TLD: string,
  }) {
    this.client = client;
    this.store = store;
    this.TLD = TLD;
  }

  getHostname = async (container: any) => {
    const {
      Config: {
        Hostname: hostname,
      },
    } = await this.client.getContainer(container.Id).inspect();
    return `${hostname}.${this.TLD}`;
  };

  getPublicPort = (container: any) => {
    const { Ports: ports } = container;
    if (ports.length === 0) return null;
    const { PublicPort: publicPort } = ports[0];
    if (!publicPort) return null;
    return publicPort;
  };

  getNode = async (container: any) => {
    const publicPort = this.getPublicPort(container);
    if (!publicPort) return null;
    const hostname = await this.getHostname(container);
    return {
      hostname,
      publicPort,
    };
  };

  getNodes = async (containers: any) => {
    const nodes = await Promise.all(
      containers.map(container => (
        this.getNode(container)
      )),
    );
    return compact(nodes);
  };

  process = async (action: any) => {
    console.log(`processing ${action}`);
    const containers = await this.client.listContainers();
    const ports = await this.getNodes(containers);
    this.store.setPorts(ports);
  };
}
