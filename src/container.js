import docker from "./docker";

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
    console.log(publicPorts);
  });
};

export {
  addContainer,
};
