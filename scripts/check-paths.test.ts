import { describe, expect, it } from "vitest";
import { pathViolations } from "#scripts/check-paths";

describe("path policy", () => {
  it("rejects alternate toolchains, JavaScript, and long semantic names", () => {
    expect(
      pathViolations([
        ".npmrc",
        "src/legacy.jsx",
        "packages/compiler/three-word-policy.ts",
        "packages/compiler/HTTPClientPolicy.ts",
      ])
    ).toEqual([
      ".npmrc: pnpm and package.json own the toolchain contract",
      "src/legacy.jsx: hand-written JavaScript source is not allowed",
      "packages/compiler/three-word-policy.ts: three-word-policy.ts",
      "packages/compiler/HTTPClientPolicy.ts: HTTPClientPolicy.ts",
    ]);
  });

  it("allows semantic suffixes, numbers, and source-owned lesson folders", () => {
    expect(
      pathViolations([
        "",
        "packages/compiler/policy.config.test.ts",
        "packages/compiler/release-2026-state.ts",
        "packages/corpus/material/lesson/very-long-source-slug/en.mdx",
      ])
    ).toEqual([]);
  });

  it("still validates filenames inside source-owned lesson folders", () => {
    expect(
      pathViolations([
        "packages/corpus/material/lesson/very-long-source-slug/three-word-file.mdx",
      ])
    ).toEqual([
      "packages/corpus/material/lesson/very-long-source-slug/three-word-file.mdx: three-word-file.mdx",
    ]);
  });
});
