declare module "lodash.compact" {
  declare function compact<T, N: ?T>(array: Array<N>): Array<T>;
  declare var exports: typeof compact;
}
