/* eslint-disable */

import Store from "./store";
import Docker from "./docker";
import DNSServer from "./dnsServer";
import { TLD } from "./settings";


const store = new Store();
const docker = new Docker({
  store,
  TLD,
});
const dnsServer = new DNSServer({
  getRecordFor: store.getRecordFor,
  store,
  TLD,
});
