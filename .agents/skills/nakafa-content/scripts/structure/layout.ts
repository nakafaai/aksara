import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";

const DIRECTORY_NAME_PATTERN = /^[a-z]+$/u;
const TYPESCRIPT_NAME_PATTERN = /^[a-z]+(?:\.test)?\.ts$/u;

/** Collects every directory and TypeScript file below the checker root. */
function collectLayout(directory: string): {
  directories: string[];
  files: string[];
} {
  const directories: string[] = [];
  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      directories.push(path);
      const nested = collectLayout(path);
      directories.push(...nested.directories);
      files.push(...nested.files);
    } else if (entry.isFile() && entry.name.endsWith(".ts")) {
      files.push(path);
    }
  }
  return { directories, files };
}

/** Returns every script path that violates the grouped one-word layout. */
export function scriptLayoutIssues(root: string): string[] {
  const layout = collectLayout(root);
  const issues = layout.directories.filter((directory) => {
    const name = directory.slice(dirname(directory).length + 1);
    return !DIRECTORY_NAME_PATTERN.test(name);
  });
  for (const file of layout.files) {
    const name = file.slice(dirname(file).length + 1);
    if (dirname(file) === root || !TYPESCRIPT_NAME_PATTERN.test(name)) {
      issues.push(file);
    }
  }
  return issues;
}
