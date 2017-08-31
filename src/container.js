import compact from "lodash.compact";
import docker from "./docker";
import store from "./store";

const getHostname = async (container) => {
  const {
    Config: {
      Hostname: hostname,
    },
  } = await docker.getContainer(container.Id).inspect();
  return hostname;
};

const getPublicPort = (container) => {
  const { Ports: ports } = container;
  if (ports.length === 0) return null;
  const { PublicPort: publicPort } = ports[0];
  if (!publicPort) return null;
  return publicPort;
};

const getNode = async (container) => {
  const publicPort = getPublicPort(container);
  if (!publicPort) return null;
  const hostname = await getHostname(container);
  return {
    hostname,
    publicPort,
  };
};

const getNodes = async (containers) => {
  const nodes = await Promise.all(
    containers.map(container => (
      getNode(container)
    )),
  );
  return compact(nodes);
};

const processContainers = async (action) => {
  console.log(`processing ${action}`);
  const containers = await docker.listContainers();
  const ports = await getNodes(containers);
  store.setPorts(ports);
};

export {
  processContainers,
};
