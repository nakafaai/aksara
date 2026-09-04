import { createHash } from "node:crypto";

import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem, PlatformError } from "effect";

import {
  type CommandRunner,
  makeOsvAuditProgram,
  OsvAuditError,
  type OsvRelease,
  resolveOsvRelease,
  runCommand,
  startOsvAudit,
} from "#scripts/osv";

const SCANNER = new TextEncoder().encode("verified scanner");
const RELEASE = {
  asset: "osv-scanner_test",
  checksum: createHash("sha256").update(SCANNER).digest("hex"),
} satisfies OsvRelease;

interface FakeRunnerOptions {
  readonly downloadExit?: number;
  readonly scannerExit?: number;
  readonly source?: Uint8Array;
}

/** Creates a deterministic scanner process with a real temporary binary. */
function fakeRunner(
  calls: { args: readonly string[]; executable: string }[],
  options: FakeRunnerOptions = {}
): CommandRunner {
  return (executable, args) =>
    Effect.gen(function* () {
      calls.push({ args, executable });
      if (executable !== "curl") {
        return options.scannerExit ?? 0;
      }
      if ((options.downloadExit ?? 0) !== 0) {
        return options.downloadExit ?? 1;
      }
      const output = args[args.indexOf("--output") + 1] ?? "missing-output";
      const fileSystem = yield* FileSystem.FileSystem;
      yield* fileSystem
        .writeFile(output, options.source ?? SCANNER)
        .pipe(
          Effect.mapError(
            (error) => new OsvAuditError({ detail: error.message })
          )
        );
      return 0;
    });
}

describe("OSV dependency audit", () => {
  it.effect.each([
    [
      "darwin",
      "arm64",
      "osv-scanner_darwin_arm64",
      "75c44d6332f892a1e56286f4105a98ed751ae28d215ca0a8b65cc00d84103054",
    ],
    [
      "darwin",
      "x64",
      "osv-scanner_darwin_amd64",
      "9f89beb6c3d784893cb1cae0a3d56c529bfe91075418c2f9440c45b79654198b",
    ],
    [
      "linux",
      "arm64",
      "osv-scanner_linux_arm64",
      "3d0f5aa5a6baa8eb32bcef247388e149ef6030a6634ccae6fa0d62681fb27a6d",
    ],
    [
      "linux",
      "x64",
      "osv-scanner_linux_amd64",
      "f9f25499a2c8cc367b3af45df2ea7eeca7fbccceab9c35079968f4b3652194be",
    ],
  ] as const)(
    "selects the pinned %s/%s release",
    ([platform, arch, asset, checksum]) =>
      Effect.gen(function* () {
        expect(yield* resolveOsvRelease(platform, arch)).toEqual({
          asset,
          checksum,
        });
      })
  );

  it.effect("rejects a platform without an official binary", () =>
    Effect.gen(function* () {
      const error = yield* resolveOsvRelease("aix", "ppc64").pipe(Effect.flip);
      expect(error.detail).toContain("aix/ppc64");
    })
  );

  it.effect("downloads, authenticates, executes, and erases one scanner", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped();
      yield* fileSystem.writeFileString(
        `${root}/pnpm-lock.yaml`,
        "lockfileVersion: '9.0'"
      );
      const calls: { args: readonly string[]; executable: string }[] = [];

      yield* makeOsvAuditProgram(
        root,
        Effect.succeed(RELEASE),
        fakeRunner(calls)
      );

      expect(calls).toHaveLength(2);
      expect(calls[0]).toMatchObject({ executable: "curl" });
      expect(calls[0]?.args).toContain("--retry-all-errors");
      expect(calls[1]?.args).toEqual([
        "scan",
        "source",
        `--lockfile=${root}/pnpm-lock.yaml`,
      ]);
      expect(calls[1]?.executable).toContain(RELEASE.asset);
      yield* fileSystem.access(calls[1]?.executable ?? "").pipe(Effect.flip);
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect.each([
    {
      expected: "Unable to download",
      options: { downloadExit: 1 },
      release: RELEASE,
    },
    {
      expected: "checksum verification failed",
      options: { source: new TextEncoder().encode("foreign scanner") },
      release: RELEASE,
    },
    {
      expected: "found an issue or failed",
      options: { scannerExit: 1 },
      release: RELEASE,
    },
  ])("fails closed when $expected", ({ expected, options, release }) =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped();
      const calls: { args: readonly string[]; executable: string }[] = [];
      const error = yield* makeOsvAuditProgram(
        root,
        Effect.succeed(release),
        fakeRunner(calls, options)
      ).pipe(Effect.flip);

      expect(error.detail).toContain(expected);
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect.each([
    ["makeTempDirectoryScoped", "create the scanner directory"],
    ["readFile", "read OSV Scanner"],
    ["chmod", "authorize OSV Scanner"],
  ] as const)("maps a %s filesystem failure", ([method, expected]) =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const failure = PlatformError.systemError({
        _tag: "Unknown",
        description: "forced failure",
        method,
        module: "FileSystem",
      });
      const failingFileSystem = FileSystem.makeNoop({
        ...fileSystem,
        [method]: () => Effect.fail(failure),
      });
      const error = yield* makeOsvAuditProgram(
        import.meta.dirname,
        Effect.succeed(RELEASE),
        fakeRunner([])
      ).pipe(
        Effect.provideService(FileSystem.FileSystem, failingFileSystem),
        Effect.flip
      );

      expect(error.detail).toContain(expected);
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("fails before filesystem work on an unsupported platform", () =>
    makeOsvAuditProgram(
      import.meta.dirname,
      resolveOsvRelease("aix", "ppc64"),
      fakeRunner([])
    ).pipe(
      Effect.flip,
      Effect.tap((error) =>
        Effect.sync(() => expect(error.detail).toContain("aix/ppc64"))
      ),
      Effect.provide(NodeServices.layer)
    )
  );

  it.effect("maps subprocess startup and preserves nonzero exits", () =>
    Effect.gen(function* () {
      const exitCode = yield* runCommand(
        process.execPath,
        ["--eval", "process.exit(3)"],
        { cwd: import.meta.dirname }
      );
      const missing = yield* runCommand("aksara-missing-osv-command", [], {
        cwd: import.meta.dirname,
      }).pipe(Effect.flip);

      expect(exitCode).toBe(3);
      expect(missing.detail.length).toBeGreaterThan(0);
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it("starts only the direct executable boundary", () => {
    const programs: unknown[] = [];
    const program = Effect.void;

    startOsvAudit(false, program, (audit) => programs.push(audit));
    startOsvAudit(true, program, (audit) => programs.push(audit));

    expect(programs).toHaveLength(1);
  });
});
