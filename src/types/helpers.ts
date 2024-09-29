/**
 * @description: Test handler type
 */
export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => unknown
  ? A
  : never;

/**
 * @description: Nullable type
 */
export type Nullable<T> = T | null;
