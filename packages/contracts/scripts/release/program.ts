import { parseArgs } from "node:util";
import { Effect, FileSystem } from "effect";
import { verifyArchive, writeOutputs } from "#scripts/release/archive";
import {
  decideArchive,
  releaseError,
  resolveIdentity,
} from "#scripts/release/identity";
import { proveContractRelease } from "#scripts/release/proof";

/** Release identity subcommands available only to protected workflows. */
type ReleaseCommand = "decide" | "describe" | "prove";

interface ReleaseArguments {
  readonly archive: string | undefined;
  readonly command: ReleaseCommand;
  readonly output: string | undefined;
  readonly packagePath: string;
  readonly previous: string | undefined;
  readonly releases: string | undefined;
  readonly repository: string | undefined;
  readonly sourceSha: string | undefined;
}

/** Parses one exact contract workflow command without exposing thrown CLI errors. */
const parseReleaseArguments = Effect.fn(
  "AksaraContracts.parseReleaseArguments"
)(function* (args: readonly string[]) {
  const parsed = yield* Effect.try({
    catch: () =>
      releaseError("argument", "Contract release arguments are malformed"),
    try: () =>
      parseArgs({
        allowPositionals: true,
        args: [...args],
        options: {
          archive: { type: "string" },
          output: { type: "string" },
          package: {
            default: "packages/contracts/package.json",
            type: "string",
          },
          previous: { type: "string" },
          releases: { type: "string" },
          repository: { type: "string" },
          "source-sha": { type: "string" },
        },
        strict: true,
      }),
  });
  const [command, ...extra] = parsed.positionals;
  if (
    extra.length > 0 ||
    (command !== "describe" && command !== "decide" && command !== "prove")
  ) {
    return yield* releaseError(
      "argument",
      "Release identity command must be describe, decide, or prove"
    );
  }
  return {
    archive: parsed.values.archive,
    command,
    output: parsed.values.output,
    packagePath: parsed.values.package,
    previous: parsed.values.previous,
    releases: parsed.values.releases,
    repository: parsed.values.repository,
    sourceSha: parsed.values["source-sha"],
  } satisfies ReleaseArguments;
});

/** Requires one command-owned argument and preserves its exact name in errors. */
function requireArgument(value: string | undefined, name: string) {
  if (value === undefined || value.length === 0) {
    return Effect.fail(
      releaseError("argument", `Contract release ${name} is required`)
    );
  }
  return Effect.succeed(value);
}

/** Runs one Effect-native contract release command for GitHub workflows. */
export const makeReleaseCommand = Effect.fn(
  "AksaraContracts.makeReleaseCommand"
)(function* (rawArguments: readonly string[]) {
  const args = yield* parseReleaseArguments(rawArguments);
  if (args.command === "prove") {
    const archivePath = yield* requireArgument(args.archive, "archive path");
    const repository = yield* requireArgument(
      args.repository,
      "GitHub repository"
    );
    const sourceSha = yield* requireArgument(args.sourceSha, "source SHA");
    return yield* proveContractRelease({
      archivePath,
      packagePath: args.packagePath,
      repository,
      sourceSha,
    }).pipe(Effect.scoped);
  }
  const output = yield* requireArgument(args.output, "output path");
  const releases = yield* requireArgument(args.releases, "releases path");
  const fileSystem = yield* FileSystem.FileSystem;
  const packageSource = yield* fileSystem
    .readFileString(args.packagePath, "utf8")
    .pipe(
      Effect.mapError(() =>
        releaseError("platform", "Contract package manifest read failed")
      )
    );
  const releasesSource = yield* fileSystem
    .readFileString(releases, "utf8")
    .pipe(
      Effect.mapError(() =>
        releaseError("platform", "Contract release list read failed")
      )
    );
  const plan = yield* resolveIdentity(packageSource, releasesSource);
  const latestAssetName = plan.latest?.assetName ?? "";
  const latestTag = plan.latest?.releaseTag ?? "";
  const shared = {
    asset_name: plan.current.assetName,
    has_latest: plan.latest !== undefined,
    latest_asset_name: latestAssetName,
    latest_tag: latestTag,
    package_version: plan.current.version,
    release_tag: plan.current.releaseTag,
  };
  if (args.command === "describe") {
    yield* writeOutputs(output, shared);
    return;
  }
  const archive = yield* requireArgument(args.archive, "archive path");
  const currentBytes = yield* verifyArchive(archive, plan.current);
  const previousBytes = plan.latest
    ? yield* verifyArchive(
        yield* requireArgument(args.previous, "previous archive path"),
        plan.latest
      )
    : undefined;
  const decision = yield* decideArchive(plan, currentBytes, previousBytes);
  yield* writeOutputs(output, {
    ...shared,
    mode: decision.mode,
    sha256: decision.sha256,
    size: decision.size,
  });
});
