import { NodeServices } from "@effect/platform-node";
import { afterEach, describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";
import {
  enforceViolations,
  TrackedFilesError,
  trackedFiles,
  typescriptFiles,
} from "#scripts/check/files";
import { runGit } from "#scripts/git";

const originalExitCode = process.exitCode;

afterEach(() => {
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
});

/** Runs one effect with the process working directory moved to root. */
const inDirectory = <A, E, R>(root: string, effect: Effect.Effect<A, E, R>) =>
  Effect.acquireUseRelease(
    Effect.sync(() => {
      const previous = process.cwd();
      process.chdir(root);
      return previous;
    }),
    () => effect,
    (previous) => Effect.sync(() => process.chdir(previous))
  );

/** Creates an empty Git repository in a scoped temporary folder. */
const makeRepository = Effect.fn("AksaraPolicyTest.makeRepository")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-files-",
    });
    yield* runGit(["init", "--quiet"], { cwd: root });
    return root;
  }
);

describe("files", () => {
  it.effect(
    "lists tracked files that still exist and skips vendored source",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* makeRepository();
        yield* fileSystem.makeDirectory(path.join(root, "repos/effect"), {
          recursive: true,
        });
        for (const file of ["kept.ts", "gone.ts", "repos/effect/source.ts"]) {
          yield* fileSystem.writeFileString(
            path.join(root, file),
            "export {};\n"
          );
        }
        yield* runGit(
          ["add", "--", "kept.ts", "gone.ts", "repos/effect/source.ts"],
          { cwd: root }
        );
        yield* fileSystem.remove(path.join(root, "gone.ts"));

        expect(yield* inDirectory(root, trackedFiles())).toEqual(["kept.ts"]);
      }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect(
    "keeps the listing when a tracked path sits below a regular file",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* makeRepository();
        yield* fileSystem.makeDirectory(path.join(root, "blocked"));
        yield* fileSystem.writeFileString(
          path.join(root, "blocked/child.ts"),
          "export {};\n"
        );
        yield* fileSystem.writeFileString(
          path.join(root, "kept.ts"),
          "export {};\n"
        );
        yield* runGit(["add", "--", "blocked/child.ts", "kept.ts"], {
          cwd: root,
        });
        yield* fileSystem.remove(path.join(root, "blocked"), {
          recursive: true,
        });
        yield* fileSystem.writeFileString(
          path.join(root, "blocked"),
          "a regular file\n"
        );

        const files = yield* inDirectory(root, trackedFiles());
        expect(files).not.toContain("blocked/child.ts");
        expect(files).toContain("kept.ts");
      }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("passes Git warnings to stderr when the listing succeeds", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* makeRepository();
      // A link that names itself makes Git warn about the exclude file it names.
      const excludes = path.join(root, ".git", "excludes");
      yield* fileSystem.symlink(excludes, excludes);
      yield* runGit(["config", "core.excludesFile", excludes], { cwd: root });
      yield* fileSystem.writeFileString(
        path.join(root, "kept.ts"),
        "export {};\n"
      );
      yield* runGit(["add", "--", "kept.ts"], { cwd: root });
      const write = vi
        .spyOn(process.stderr, "write")
        .mockImplementation(() => true);

      expect(yield* inDirectory(root, trackedFiles())).toEqual(["kept.ts"]);
      expect(write).toHaveBeenCalledWith(
        expect.stringContaining("unable to access")
      );
    }).pipe(Effect.provide(NodeServices.layer))
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
      const failure = yield* inDirectory(root, trackedFiles()).pipe(
        Effect.flip
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
