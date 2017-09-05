declare module "dotenv" {
  declare type configOptions = {
    path: ?string,
    encoding: ?string,
  };

  declare class Dotenv {
    parse(src: string): any,
    config(options: ?configOptions): any,
    load(options: ?configOptions): any,
  }

  declare var exports: Dotenv;
}
