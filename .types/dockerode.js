declare type modemOptions = {
  socketPath?: string,
  host?: string,
  port?: number,
  version?: string,
  key?: string,
  cert?: string,
  ca?: string,
  timeout?: number,
  checkServerIdentity?: Boolean,
  protocol?: string,
};

declare class DockerClient {
  getEvents(options: any, callback: Function): any,
};

declare module "dockerode" {
  declare class Dockerode {
    constructor(options: ?modemOptions): DockerClient,
  }
  declare var exports: typeof Dockerode;
}

