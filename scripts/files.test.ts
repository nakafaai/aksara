import { afterEach, describe, expect, it, vi } from "vitest";
import {
  enforceViolations,
  parseTrackedFiles,
  trackedFiles,
  typescriptFiles,
} from "#scripts/files";

const originalExitCode = process.exitCode;

afterEach(() => {
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
});

describe("files", () => {
  it("parses existing nonempty Git paths", () => {
    expect(
      parseTrackedFiles("kept.ts\nmissing.ts\n\n", (path) => path === "kept.ts")
    ).toEqual(["kept.ts"]);
  });

  it("selects authored TypeScript outside generated directories", () => {
    expect(
      typescriptFiles([
        "source.ts",
        "source.tsx",
        "source.mts",
        "source.cts",
        "source.js",
        "dist/output.ts",
        "node_modules/package/index.ts",
        "package/_generated/api.ts",
      ])
    ).toEqual(["source.ts", "source.tsx", "source.mts", "source.cts"]);
    expect(typescriptFiles()).toContain("scripts/files.ts");
    expect(trackedFiles()).toContain("package.json");
  });

  it("does nothing when a policy has no violations", () => {
    const write = vi.spyOn(process.stderr, "write");

    enforceViolations("Policy", []);

    expect(write).not.toHaveBeenCalled();
  });

  it("writes stable diagnostics and marks a failed policy", () => {
    const write = vi
      .spyOn(process.stderr, "write")
      .mockImplementation(() => true);

    enforceViolations("Policy", ["first", "second"]);

    expect(write).toHaveBeenCalledWith("Policy:\nfirst\nsecond\n");
    expect(process.exitCode).toBe(1);
  });
});
