// @flow

import find from "lodash.find";

type Port = {
  hostname: string;
  publicPort: number;
};

export default class Store {
  ports: Array<Port>;

  constructor() {
    this.ports = [];
  }

  getPorts = (): Array<Port> => (
    this.ports
  );

  setPorts = (ports: Array<Port>): Array<Port> => (
    this.ports = ports
  );

  getRecordFor = (hostname: string): Port | void => (
    find(this.ports, { hostname })
  );
}
