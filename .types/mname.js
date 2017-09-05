declare module mname {
  declare type serverOptions = {
    name: ?string,
    log: ?any,
  };

  declare type srvOptions = {
    weight: ?number,
    priority: ?number,
  };

  declare class Mname {
    createServer(options: ?serverOptions): any,
    SRVRecord(
      target: string,
      port: number,
      opts: ?srvOptions,
    ): any,
  }

  declare var exports: Mname;
};
