import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

const TEXT_EXTENSIONS = new Set([".md", ".mdx", ".ts"]);

/** Collects text files below one source root without following links. */
function collectTextFiles(root: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectTextFiles(path));
    } else if (entry.isFile() && TEXT_EXTENSIONS.has(extname(entry.name))) {
      files.push(path);
    }
  }
  return files;
}

/** Returns files containing one forbidden byte. */
export function filesContainingCharacter(
  roots: readonly string[],
  character: string
): string[] {
  return roots
    .flatMap((root) => collectTextFiles(root))
    .filter((file) => readFileSync(file, "utf8").includes(character))
    .sort();
}
