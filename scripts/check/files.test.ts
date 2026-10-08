import { NodeServices } from "@effect/platform-node";
import { afterEach, describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem } from "effect";
import {
  enforceViolations,
  parseTrackedFiles,
  TrackedFilesError,
  trackedFiles,
  typescriptFiles,
} from "#scripts/check/files";

const originalExitCode = process.exitCode;

afterEach(() => {
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
});

describe("files", () => {
  it.effect("parses existing nonempty Git paths outside vendored source", () =>
    Effect.gen(function* () {
      expect(
        yield* parseTrackedFiles(
          "kept.ts\nrepos/effect/source.ts\nmissing.ts\n\n",
          (path) => Effect.succeed(path !== "missing.ts")
        )
      ).toEqual(["kept.ts"]);
    })
  );

  it.effect("selects authored TypeScript outside generated directories", () =>
    Effect.gen(function* () {
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

      const files = yield* trackedFiles();
      expect(typescriptFiles(files)).toContain("scripts/check/files.ts");
      expect(files).toContain("package.json");
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("reports a failed Git listing as a typed error", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-files-",
      });
      const failure = yield* Effect.acquireUseRelease(
        Effect.sync(() => {
          const previous = process.cwd();
          process.chdir(root);
          return previous;
        }),
        () => trackedFiles().pipe(Effect.flip),
        (previous) => Effect.sync(() => process.chdir(previous))
      );

      expect(failure).toBeInstanceOf(TrackedFilesError);
      expect(failure.message).toContain("git ls-files --cached");
    }).pipe(Effect.provide(NodeServices.layer))
  );

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
