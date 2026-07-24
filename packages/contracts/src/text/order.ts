/** Compares strings by stable JavaScript UTF-16 code-unit order. */
export function compareCodeUnits(left: string, right: string) {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}
