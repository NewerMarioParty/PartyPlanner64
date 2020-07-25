/**
 * Tests if a value appears to be Promise-like.
 * @param obj Value to check
 */
export function isPromiseLike<T>(obj: any): obj is PromiseLike<T> {
  if (!obj) {
    return false;
  }
  return typeof obj.then === "function";
}
