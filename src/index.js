/* eslint-disable */

import Docker from "./docker";
import DNSServer from "./dnsServer";
import Store from "./store";

const store = new Store();
const docker = new Docker({ store });
const dnsServer = new DNSServer({ store });
