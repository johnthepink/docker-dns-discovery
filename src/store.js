import find from "lodash.find";

export default class Store {

  constructor() {
    this.ports = [];
  }

  getPorts = () => (
    this.ports
  );

  setPorts = ports => (
    this.ports = ports
  );

  getRecordFor = hostname => (
    find(this.ports, { hostname })
  );
}
