import { createHash } from "node:crypto";
import { Effect, FileSystem, Path, Schema, Stream } from "effect";
import { ChildProcess } from "effect/process";
import { verifyArchive } from "#scripts/release/archive";
import { decodeRelease, decodeTag } from "#scripts/release/github";
import { packageIdentity, releaseError } from "#scripts/release/identity";

const SHA_PATTERN = /^[0-9a-f]{40}$/u;
const REPOSITORY_PATTERN = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u;

const ReleaseToolsSchema = Schema.Struct({
  gh: Schema.String,
  git: Schema.String,
  tar: Schema.String,
});

type ReleaseTools = typeof ReleaseToolsSchema.Type;

const defaultTools: ReleaseTools = {
  gh: "gh",
  git: "git",
  tar: "tar",
};

const ContractProofInputSchema = Schema.Struct({
  archivePath: Schema.String,
  packagePath: Schema.String,
  repository: Schema.String,
  sourceSha: Schema.String,
  tools: Schema.optionalKey(
    Schema.Struct({
      gh: Schema.optionalKey(Schema.String),
      git: Schema.optionalKey(Schema.String),
      tar: Schema.optionalKey(Schema.String),
    })
  ),
});

/** Exact inputs used to prove one remotely distributed contract archive. */
export type ContractProofInput = typeof ContractProofInputSchema.Type;

const ContractProofSchema = Schema.Struct({
  assetName: Schema.String,
  releaseSha: Schema.String,
  releaseTag: Schema.String,
  sha256: Schema.String,
  size: Schema.Finite,
});

/** Durable facts returned only after every immutable release proof succeeds. */
export type ContractProof = typeof ContractProofSchema.Type;

/** Maps one external command failure to its stable proof stage. */
function commandError(stage: string) {
  return () =>
    releaseError("platform", `Contract release ${stage} operation failed`);
}

/** Executes one external proof command and captures complete UTF-8 output. */
function commandText(
  executable: string,
  args: readonly string[],
  stage: string
) {
  return Effect.gen(function* () {
    const process = yield* ChildProcess.make(executable, args, {
      stderr: "inherit",
    });
    const output = yield* process.stdout.pipe(
      Stream.decodeText(),
      Stream.runFold(
        () => "",
        (text, chunk) => text + chunk
      )
    );
    const exitCode = yield* process.exitCode;
    if (exitCode !== 0) {
      return yield* releaseError(
        "platform",
        `Contract release ${stage} command exited unsuccessfully`
      );
    }
    return output;
  }).pipe(Effect.mapError(commandError(stage)), Effect.scoped);
}

/** Executes one external proof command whose exit status is its result. */
function commandVoid(
  executable: string,
  args: readonly string[],
  stage: string
) {
  return Effect.scoped(
    Effect.gen(function* () {
      const process = yield* ChildProcess.make(executable, args, {
        stderr: "inherit",
        stdout: "inherit",
      }).pipe(Effect.mapError(commandError(stage)));
      const exitCode = yield* process.exitCode.pipe(
        Effect.mapError(commandError(stage))
      );
      if (exitCode !== 0) {
        return yield* releaseError(
          "platform",
          `Contract release ${stage} command exited unsuccessfully`
        );
      }
    })
  );
}

/** Proves one immutable GitHub Release archive matches the current source bytes. */
export const proveContractRelease = Effect.fn(
  "AksaraContracts.proveContractRelease"
)(function* (input: ContractProofInput) {
  const tools = { ...defaultTools, ...input.tools };
  if (!REPOSITORY_PATTERN.test(input.repository)) {
    return yield* releaseError(
      "argument",
      "The GitHub repository must be an exact owner/name identity"
    );
  }
  if (!SHA_PATTERN.test(input.sourceSha)) {
    return yield* releaseError(
      "argument",
      "The current source SHA must contain 40 lowercase hexadecimal characters"
    );
  }
  const fileSystem = yield* FileSystem.FileSystem;
  const source = yield* fileSystem
    .readFileString(input.packagePath, "utf8")
    .pipe(Effect.mapError(commandError("package read")));
  const identity = yield* packageIdentity(source);
  const currentBytes = yield* verifyArchive(
    input.archivePath,
    identity,
    tools.tar
  );
  const releaseSource = yield* commandText(
    tools.gh,
    ["api", `repos/${input.repository}/releases/tags/${identity.releaseTag}`],
    "metadata read"
  );
  const release = yield* decodeRelease(releaseSource);
  if (
    release.draft ||
    !release.immutable ||
    release.prerelease ||
    release.tag_name !== identity.releaseTag ||
    !SHA_PATTERN.test(release.target_commitish)
  ) {
    return yield* releaseError(
      "release",
      "The contract release must be final, immutable, exact-tagged, and SHA-pinned"
    );
  }
  const [asset] = release.assets;
  if (
    release.assets.length !== 1 ||
    asset?.name !== identity.assetName ||
    asset.size !== currentBytes.byteLength
  ) {
    return yield* releaseError(
      "release",
      "The contract release must contain exactly the expected archive and size"
    );
  }
  const sha256 = createHash("sha256").update(currentBytes).digest("hex");
  if (asset.digest !== `sha256:${sha256}`) {
    return yield* releaseError(
      "release",
      "The release asset digest differs from the current contract archive"
    );
  }
  const tagSource = yield* commandText(
    tools.gh,
    ["api", `repos/${input.repository}/git/ref/tags/${identity.releaseTag}`],
    "tag read"
  );
  const tag = yield* decodeTag(tagSource);
  if (
    tag.object.type !== "commit" ||
    tag.object.sha !== release.target_commitish
  ) {
    return yield* releaseError(
      "release",
      "The contract release tag must target its exact source commit"
    );
  }
  yield* commandVoid(
    tools.git,
    ["merge-base", "--is-ancestor", release.target_commitish, input.sourceSha],
    "source ancestry"
  );
  const path = yield* Path.Path;
  const downloadRoot = yield* fileSystem
    .makeTempDirectoryScoped({ prefix: "aksara-contract-proof-" })
    .pipe(Effect.mapError(commandError("temporary directory")));
  const downloadedPath = path.join(downloadRoot, identity.assetName);
  yield* commandVoid(
    tools.gh,
    [
      "release",
      "download",
      identity.releaseTag,
      "--dir",
      downloadRoot,
      "--pattern",
      identity.assetName,
      "--repo",
      input.repository,
    ],
    "archive download"
  );
  const downloadedBytes = yield* verifyArchive(
    downloadedPath,
    identity,
    tools.tar
  );
  if (!Buffer.from(currentBytes).equals(Buffer.from(downloadedBytes))) {
    return yield* releaseError(
      "release",
      "The downloaded immutable archive differs from the current source build"
    );
  }
  yield* commandVoid(
    tools.gh,
    ["release", "verify", identity.releaseTag, "--repo", input.repository],
    "release verification"
  );
  yield* commandVoid(
    tools.gh,
    [
      "release",
      "verify-asset",
      identity.releaseTag,
      downloadedPath,
      "--repo",
      input.repository,
    ],
    "asset verification"
  );
  yield* commandVoid(
    tools.gh,
    [
      "attestation",
      "verify",
      downloadedPath,
      "--repo",
      input.repository,
      "--signer-workflow",
      `${input.repository}/.github/workflows/contracts.yml`,
      "--source-digest",
      release.target_commitish,
      "--source-ref",
      "refs/heads/main",
    ],
    "attestation verification"
  );
  return {
    assetName: identity.assetName,
    releaseSha: release.target_commitish,
    releaseTag: identity.releaseTag,
    sha256,
    size: currentBytes.byteLength,
  } satisfies ContractProof;
});
