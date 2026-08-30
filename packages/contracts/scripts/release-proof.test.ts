import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  Crypto,
  Effect,
  Encoding,
  FileSystem,
  Path,
  Sink,
  Stream,
} from "effect";
import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process";
import {
  type ContractProofInput,
  proveContractRelease,
} from "#scripts/release-proof";

const SOURCE_SHA = "b".repeat(40);
const RELEASE_SHA = "a".repeat(40);
const VERSION = "0.1.0";
const releaseTag = { object: { sha: RELEASE_SHA, type: "commit" } };

interface FakeCommandInput {
  readonly downloadArchive: string;
  readonly failApi?: boolean;
  readonly failGit?: boolean;
  readonly release: unknown;
  readonly tag: unknown;
}

/** Builds one complete fake command contract with explicit overrides. */
function fakeCommands(
  downloadArchive: string,
  release: unknown,
  overrides: Partial<FakeCommandInput> = {}
): FakeCommandInput {
  return { downloadArchive, release, tag: releaseTag, ...overrides };
}

/** Creates one completed process handle with deterministic output and status. */
function makeProcessHandle(output: string, exitCode = 0) {
  const bytes = new TextEncoder().encode(output);
  const stdout = output.length === 0 ? Stream.empty : Stream.make(bytes);
  return ChildProcessSpawner.makeHandle({
    all: stdout,
    exitCode: Effect.succeed(ChildProcessSpawner.ExitCode(exitCode)),
    getInputFd: () => Sink.drain,
    getOutputFd: () => Stream.empty,
    isRunning: Effect.succeed(false),
    kill: () => Effect.void,
    pid: ChildProcessSpawner.ProcessId(12_345),
    stderr: Stream.empty,
    stdin: Sink.drain,
    stdout,
    unref: Effect.succeed(Effect.void),
  });
}

/** Creates one minimal contract archive with distinguishable bytes. */
const createArchive = Effect.fn("ReleaseProofTest.createArchive")(function* (
  root: string,
  marker = "current"
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const current = path.join(root, marker);
  const stage = path.join(current, "package");
  const archive = path.join(root, `${marker}.tgz`);
  yield* fileSystem.makeDirectory(stage, { recursive: true });
  yield* fileSystem.writeFileString(
    path.join(stage, "package.json"),
    `{"name":"@nakafa/aksara-contracts","version":"${VERSION}"}`
  );
  yield* fileSystem.writeFileString(path.join(stage, "marker.txt"), marker);
  const process = yield* ChildProcess.make("tar", [
    "-czf",
    archive,
    "-C",
    current,
    "package",
  ]);
  expect(yield* process.exitCode).toBe(0);
  return archive;
});

/** Builds exact release metadata from Effect-owned file and crypto services. */
const releaseMetadata = Effect.fn("ReleaseProofTest.releaseMetadata")(
  function* (archive: string) {
    const crypto = yield* Crypto.Crypto;
    const fileSystem = yield* FileSystem.FileSystem;
    const bytes = yield* fileSystem.readFile(archive);
    const digest = yield* crypto.digest("SHA-256", bytes);
    const info = yield* fileSystem.stat(archive);
    return {
      assets: [
        {
          digest: `sha256:${Encoding.encodeHex(digest)}`,
          name: `nakafa-aksara-contracts-${VERSION}.tgz`,
          size: Number(info.size),
        },
      ],
      draft: false,
      immutable: true,
      prerelease: false,
      tag_name: `@nakafa/aksara-contracts@${VERSION}`,
      target_commitish: RELEASE_SHA,
    };
  }
);

/** Creates one scoped proof fixture without embedding executable source code. */
const proofFixture = Effect.fn("ReleaseProofTest.proofFixture")(function* (
  prefix: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const root = yield* fileSystem.makeTempDirectoryScoped({ prefix });
  const archive = yield* createArchive(root);
  const release = yield* releaseMetadata(archive);
  const packagePath = path.join(root, "package.json");
  yield* fileSystem.writeFileString(
    packagePath,
    `{"name":"@nakafa/aksara-contracts","version":"${VERSION}"}`
  );
  const input = {
    archivePath: archive,
    packagePath,
    repository: "nakafaai/aksara",
    sourceSha: SOURCE_SHA,
  } satisfies ContractProofInput;
  return {
    archive,
    input,
    release,
    root,
    size: Number((yield* fileSystem.stat(archive)).size),
  };
});

/** Models only the exact GitHub and Git commands owned by the proof program. */
function makeFakeSpawner(
  live: ChildProcessSpawner.ChildProcessSpawner["Service"],
  fs: FileSystem.FileSystem,
  path: Path.Path,
  input: FakeCommandInput
) {
  return ChildProcessSpawner.make(
    Effect.fn("ReleaseProofTest.spawn")(function* (command) {
      if (command._tag !== "StandardCommand") {
        return yield* Effect.die("Unexpected piped release proof command");
      }
      if (command.command === "tar") {
        return yield* live.spawn(command);
      }
      if (command.command === "git") {
        return makeProcessHandle("", input.failGit === true ? 1 : 0);
      }
      if (command.command !== "gh") {
        return yield* Effect.die(`Unexpected executable: ${command.command}`);
      }
      if (command.args[0] === "api") {
        const output = command.args[1]?.includes("/releases/")
          ? JSON.stringify(input.release)
          : JSON.stringify(input.tag);
        return makeProcessHandle(output, input.failApi === true ? 1 : 0);
      }
      if (command.args[0] !== "release" || command.args[1] !== "download") {
        return makeProcessHandle("");
      }
      const directoryIndex = command.args.indexOf("--dir");
      const patternIndex = command.args.indexOf("--pattern");
      const directory = command.args[directoryIndex + 1];
      const name = command.args[patternIndex + 1];
      if (
        directoryIndex < 0 ||
        patternIndex < 0 ||
        directory === undefined ||
        name === undefined
      ) {
        return yield* Effect.die("Malformed release download fixture command");
      }
      yield* fs.makeDirectory(directory, { recursive: true });
      yield* fs.copyFile(input.downloadArchive, path.join(directory, name));
      return makeProcessHandle("");
    })
  );
}

/** Runs one proof with real tar IO and Effect-native fake remote commands. */
const proveWithCommands = Effect.fn("ReleaseProofTest.proveWithCommands")(
  function* (input: ContractProofInput, commands: FakeCommandInput) {
    const live = yield* ChildProcessSpawner.ChildProcessSpawner;
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const spawner = makeFakeSpawner(live, fileSystem, path, commands);
    return yield* proveContractRelease(input).pipe(
      Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, spawner)
    );
  }
);

layer(NodeServices.layer)("immutable contract release proof", (it) => {
  it.effect(
    "proves exact release bytes, tag, ancestry, and cryptographic commands",
    () =>
      Effect.gen(function* () {
        const fixture = yield* proofFixture("aksara-contract-proof-");
        const proof = yield* proveWithCommands(
          fixture.input,
          fakeCommands(fixture.archive, fixture.release)
        );

        expect(proof).toMatchObject({
          assetName: `nakafa-aksara-contracts-${VERSION}.tgz`,
          releaseSha: RELEASE_SHA,
          releaseTag: `@nakafa/aksara-contracts@${VERSION}`,
          size: fixture.size,
        });
      })
  );

  it.effect("rejects malformed proof inputs and remote metadata", () =>
    Effect.gen(function* () {
      const fixture = yield* proofFixture("aksara-proof-metadata-");
      const commands = fakeCommands(fixture.archive, fixture.release);

      const repository = yield* proveWithCommands(
        { ...fixture.input, repository: "invalid" },
        commands
      ).pipe(Effect.flip);
      expect(repository.reason).toBe("argument");
      const sourceSha = yield* proveWithCommands(
        { ...fixture.input, sourceSha: "invalid" },
        commands
      ).pipe(Effect.flip);
      expect(sourceSha.reason).toBe("argument");
      const malformedRelease = yield* proveWithCommands(
        fixture.input,
        fakeCommands(fixture.archive, "invalid")
      ).pipe(Effect.flip);
      expect(malformedRelease.reason).toBe("release");
      const command = yield* proveWithCommands(
        fixture.input,
        fakeCommands(fixture.archive, fixture.release, { failApi: true })
      ).pipe(Effect.flip);
      expect(command.reason).toBe("platform");
      const tag = yield* proveWithCommands(
        fixture.input,
        fakeCommands(fixture.archive, fixture.release, { tag: "invalid" })
      ).pipe(Effect.flip);
      expect(tag.reason).toBe("release");
    })
  );

  it.effect(
    "rejects mutable, mismatched, or unauthenticated release state",
    () =>
      Effect.gen(function* () {
        const fixture = yield* proofFixture("aksara-proof-state-");
        const cases: readonly [unknown, unknown, string][] = [
          [{ ...fixture.release, immutable: false }, releaseTag, "final"],
          [{ ...fixture.release, assets: [] }, releaseTag, "archive and size"],
          [
            {
              ...fixture.release,
              assets: [
                { ...fixture.release.assets[0], digest: "sha256:wrong" },
              ],
            },
            releaseTag,
            "digest",
          ],
          [
            fixture.release,
            { object: { sha: SOURCE_SHA, type: "commit" } },
            "exact source commit",
          ],
        ];
        const errors = yield* Effect.all(
          cases.map(([candidate, tag]) =>
            proveWithCommands(
              fixture.input,
              fakeCommands(fixture.archive, candidate, { tag })
            ).pipe(Effect.flip)
          ),
          { concurrency: "unbounded" }
        );
        for (const [index, error] of errors.entries()) {
          expect(error.detail).toContain(cases[index]?.[2] ?? "");
        }
        const ancestry = yield* proveWithCommands(
          fixture.input,
          fakeCommands(fixture.archive, fixture.release, { failGit: true })
        ).pipe(Effect.flip);
        expect(ancestry.reason).toBe("platform");
        const remote = yield* createArchive(fixture.root, "remote");
        const bytes = yield* proveWithCommands(
          fixture.input,
          fakeCommands(remote, fixture.release)
        ).pipe(Effect.flip);
        expect(bytes.detail).toContain("differs from the current source build");
      }),
    30_000
  );
});
