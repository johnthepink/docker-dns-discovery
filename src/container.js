import docker from "./docker";
import store from "./store";

const addContainer = (id) => {
  const container = docker.getContainer(id);
  container.inspect((err, data) => {
    const ports = data.NetworkSettings.Ports;
    const publicPorts = Object.keys(ports).map((key) => {
      if (ports[key]) {
        return ports[key].map(port => (
          port.HostPort
        ));
      }
      return null;
    });
    store.setPorts(publicPorts);
    console.log(store.getPorts());
  });
};

export {
  addContainer,
};
