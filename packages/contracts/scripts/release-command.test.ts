import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it, vi } from "vitest";

it("executes the release identity CLI boundary", async () => {
  const root = mkdtempSync(join(tmpdir(), "aksara-release-command-"));
  const tags = join(root, "tags.txt");
  const output = join(root, "output.txt");
  writeFileSync(tags, "contracts-v0.1.0\n");
  const originalArguments = process.argv;
  process.argv = [
    process.execPath,
    "release-command.ts",
    "describe",
    "--package",
    "package.json",
    "--tags",
    tags,
    "--output",
    output,
  ];
  await import("#scripts/release-command");

  await vi.waitFor(() => {
    expect(readFileSync(output, "utf8")).toContain(
      "asset_name=nakafa-aksara-contracts-0.6.1.tgz"
    );
  });
  process.argv = originalArguments;
});
