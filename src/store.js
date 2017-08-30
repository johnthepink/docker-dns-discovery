class Store {

  constructor() {
    this.ports = [];
  }

  getPorts = () => (
    this.ports
  );

  setPorts = (ports) => {
    this.ports = ports;
  };
}

export default new Store();
