import { readdirSync } from "node:fs";
import { join } from "node:path";
import { Array as Arr, Order } from "effect";

/**
 * Lists the directories a number of levels below a corpus root. The gate
 * checks each one as its own test, so a root that grows adds parts instead of
 * pushing one test past its timeout. Depth zero is the root itself.
 */
export function corpusParts(root: string, depth: number): string[] {
  if (depth === 0) {
    return [root];
  }
  const children = Arr.filter(
    readdirSync(root, { withFileTypes: true }),
    (entry) => entry.isDirectory()
  );
  const names = Arr.sort(
    Arr.map(children, (entry): string => entry.name),
    Order.String
  );
  return Arr.flatMap(names, (name) => corpusParts(join(root, name), depth - 1));
}
