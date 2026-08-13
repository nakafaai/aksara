import { FileSystem, Error as PlatformError } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  cleanupDirectoryReplacement,
  DirectoryReplacementError,
  replaceDirectory,
} from "#utilities/filesystem/replace-directory";

/** Runs one directory replacement against an isolated real filesystem. */
function runReplacement(
  configure: (
    fileSystem: FileSystem.FileSystem,
    paths: {
      readonly backup: string;
      readonly staging: string;
      readonly target: string;
    }
  ) => FileSystem.FileSystem,
  options: { readonly includeTarget?: boolean } = {}
) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-replace-directory-",
        });
        const paths = {
          backup: `${root}/backup`,
          staging: `${root}/staging`,
          target: `${root}/target`,
        };
        yield* fileSystem.makeDirectory(paths.staging);
        yield* fileSystem.writeFileString(`${paths.staging}/new.txt`, "new");
        if (options.includeTarget !== false) {
          yield* fileSystem.makeDirectory(paths.target);
          yield* fileSystem.writeFileString(`${paths.target}/old.txt`, "old");
        }
        const replacement = configure(fileSystem, paths);
        const outcome = yield* replaceDirectory(paths).pipe(
          Effect.provideService(FileSystem.FileSystem, replacement),
          Effect.either
        );
        yield* cleanupDirectoryReplacement(paths);
        return {
          backup: yield* fileSystem.exists(paths.backup),
          outcome,
          target: yield* fileSystem.exists(paths.target),
        };
      })
    ).pipe(Effect.provide(NodeContext.layer))
  );
}

describe("rollback-safe directory replacement", () => {
  it("installs a complete staged directory and deletes its backup", async () => {
    const result = await runReplacement((fileSystem) => fileSystem);

    expect(result.outcome._tag).toBe("Right");
    expect(result).toMatchObject({ backup: false, target: true });
  });

  it("installs into an empty destination without creating a backup", async () => {
    const result = await runReplacement((fileSystem) => fileSystem, {
      includeTarget: false,
    });

    expect(result.outcome._tag).toBe("Right");
    expect(result).toMatchObject({ backup: false, target: true });
  });

  it("restores the prior tree when staged installation fails", async () => {
    const failure = new PlatformError.SystemError({
      method: "rename",
      module: "FileSystem",
      reason: "PermissionDenied",
    });
    const result = await runReplacement((fileSystem, paths) => ({
      ...fileSystem,
      rename: (source, target) =>
        source === paths.staging && target === paths.target
          ? Effect.fail(failure)
          : fileSystem.rename(source, target),
    }));

    expect(result.outcome).toMatchObject({
      _tag: "Left",
      left: { _tag: "DirectoryReplacementError", phase: "install" },
    });
    expect(result).toMatchObject({ backup: false, target: true });
  });

  it("reports installation failure when no prior tree exists", async () => {
    const failure = new PlatformError.SystemError({
      method: "rename",
      module: "FileSystem",
      reason: "PermissionDenied",
    });
    const result = await runReplacement(
      (fileSystem, paths) => ({
        ...fileSystem,
        rename: (source, target) =>
          source === paths.staging && target === paths.target
            ? Effect.fail(failure)
            : fileSystem.rename(source, target),
      }),
      { includeTarget: false }
    );

    expect(result.outcome).toMatchObject({
      _tag: "Left",
      left: { _tag: "DirectoryReplacementError", phase: "install" },
    });
    expect(result).toMatchObject({ backup: false, target: false });
  });

  it("preserves the backup when installation and restoration both fail", async () => {
    const failure = new PlatformError.SystemError({
      method: "rename",
      module: "FileSystem",
      reason: "PermissionDenied",
    });
    const result = await runReplacement((fileSystem, paths) => ({
      ...fileSystem,
      rename: (source, target) =>
        target === paths.target && source !== paths.target
          ? Effect.fail(failure)
          : fileSystem.rename(source, target),
    }));

    expect(result.outcome).toMatchObject({
      _tag: "Left",
      left: new DirectoryReplacementError({ cause: failure, phase: "restore" }),
    });
    expect(result).toMatchObject({ backup: true, target: false });
  });
});
