import { Buffer } from "node:buffer";
import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Path, Schema, Sink, Stream } from "effect";
import { ChildProcess, ChildProcessSpawner } from "effect/process";
import {
  type ContractProofInput,
  proveContractRelease,
} from "#scripts/release/proof";
import { encodeJsonText } from "#scripts/text/json";

const SOURCE_SHA = "b".repeat(40);
const RELEASE_SHA = "a".repeat(40);
const VERSION = "0.1.0";
const releaseTag = { object: { sha: RELEASE_SHA, type: "commit" } };

/** One exact tar.gz whose package/package.json declares version 0.1.0. */
const PINNED_ARCHIVE_BASE64 =
  "H4sIAAVVx2oAA+2V3UrDMBiGq4e7AI9DT9UsSZN0EwZOca64g2lB8PCzy1xd/2jrHIi35n14Lx5Yf4pM54bYOnB9Tj4S8vMm4X3Th2lXwUDF9QicMVwprXgIIaYQ6LXKt5qRV0IYJYgKJqkUjBOBCBWSSA1NS9DyhZskhTiTEsCl6w0hdUfzx92OlPIWrDN7KFSG1DIwCPJT11ctajYp5w2DCWyY3JSMmbImTNSzDtpnh13r/AhPIU1j7IQ+hijyFI7icKICCBzVap9abXvgHduGvd2Z3NZ4E9nZpN7Fokkbm5r12DlJH7aeaqu+h3Xl3fX1MvdY5v+Xxqz/DZNm/hdlispZc//n79///A/g6yQMitkjuw/J+Q/ynxHKq/z/E77J/wbPfuBmlf//ntz/xbv+g2X+J1nnbP5LRoSGSNFC5rHm/r/TA/CVvqfvBzCGIdRhnEAMu04YpDE4aaLv6BMVJ24YZIMIppjo96sWXVFRUVHxa54BpPKwtgASAAA=";

/** Release metadata GitHub reports for exactly the pinned archive bytes. */
const pinnedRelease = {
  assets: [
    {
      digest:
        "sha256:d5a82a8990560cd5015657ebfa51032b272546852c9360062eee5069608306b1",
      name: "nakafa-aksara-contracts-0.1.0.tgz",
      size: 383,
    },
  ],
  draft: false,
  immutable: true,
  prerelease: false,
  tag_name: "@nakafa/aksara-contracts@0.1.0",
  target_commitish: RELEASE_SHA,
};

const FakeCommandInputSchema = Schema.Struct({
  downloadArchive: Schema.String,
  failApi: Schema.optionalKey(Schema.Boolean),
  failGit: Schema.optionalKey(Schema.Boolean),
  release: Schema.Unknown,
  tag: Schema.Unknown,
});

type FakeCommandInput = typeof FakeCommandInputSchema.Type;

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
  marker: string
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

/** Creates one scoped proof fixture from the exact pinned archive bytes. */
const proofFixture = Effect.fn("ReleaseProofTest.proofFixture")(function* (
  prefix: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const root = yield* fileSystem.makeTempDirectoryScoped({ prefix });
  const archive = path.join(root, "current.tgz");
  yield* fileSystem.writeFile(
    archive,
    Buffer.from(PINNED_ARCHIVE_BASE64, "base64")
  );
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
  return { archive, input, release: pinnedRelease, root };
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
          ? encodeJsonText(input.release)
          : encodeJsonText(input.tag);
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

        expect(proof).toEqual({
          assetName: "nakafa-aksara-contracts-0.1.0.tgz",
          releaseSha: RELEASE_SHA,
          releaseTag: "@nakafa/aksara-contracts@0.1.0",
          sha256:
            "d5a82a8990560cd5015657ebfa51032b272546852c9360062eee5069608306b1",
          size: 383,
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
                {
                  ...fixture.release.assets[0],
                  digest:
                    "sha256:d5a82a8990560cd5015657ebfa51032b272546852c9360062eee5069608306b0",
                },
              ],
            },
            releaseTag,
            "digest",
          ],
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
        const errors = yield* Effect.forEach(
          cases,
          ([candidate, tag]) =>
            proveWithCommands(
              fixture.input,
              fakeCommands(fixture.archive, candidate, { tag })
            ).pipe(Effect.flip),
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
