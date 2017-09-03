declare module "lodash.find" {
  declare type matchesIterateeShorthand = Object;
  declare type matchesPropertyIterateeShorthand = [string, any];
  declare type propertyIterateeShorthand = string;

  declare type OPredicate<A, O> =
  | ((value: A, key: string, object: O) => any)
  | matchesIterateeShorthand
  | matchesPropertyIterateeShorthand
  | propertyIterateeShorthand;

  declare type Predicate<T> =
  | ((value: T, index: number, array: Array<T>) => any)
  | matchesIterateeShorthand
  | matchesPropertyIterateeShorthand
  | propertyIterateeShorthand;

  declare function find<T>(
    array: ?Array<T>,
    predicate?: Predicate<T>,
    fromIndex?: number
  ): T | void;
  declare function find<V, A, T: { [id: string]: A }>(
    object: T,
    predicate?: OPredicate<A, T>,
    fromIndex?: number
  ): V;
  declare var exports: typeof find;
}
