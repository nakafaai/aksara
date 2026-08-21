import { resolve } from "node:path";

import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, FileSystem, Schema } from "effect";
import { parse } from "yaml";

import {
  DependencyCommandError,
  decodeOutdatedDependencies,
  decodeRegistryVersion,
  type PnpmRunner,
  runPnpm,
} from "#scripts/dependency-command";
import {
  DEPENDENCY_HOLDS,
  DEPENDENCY_RELEASE_AGE_EXCLUSIONS,
  DEPENDENCY_RELEASE_AGE_MINUTES,
  type DependencyHold,
  declaredVersion,
  expectedIgnoredDependencies,
} from "#scripts/dependency-policy";

export interface BumpDependenciesConfig {
  readonly manifest: string;
  readonly root: string;
  readonly workspace: string;
}

const DEFAULT_CONFIG: BumpDependenciesConfig = {
  manifest: resolve(import.meta.dirname, "../package.json"),
  root: resolve(import.meta.dirname, ".."),
  workspace: resolve(import.meta.dirname, "../pnpm-workspace.yaml"),
};

const RootManifestSchema = Schema.Struct({
  devDependencies: Schema.Record(Schema.String, Schema.String),
  devEngines: Schema.Struct({
    runtime: Schema.Struct({ version: Schema.String }),
  }),
  packageManager: Schema.String,
});

const WorkspaceSchema = Schema.Struct({
  catalog: Schema.Record(Schema.String, Schema.String),
  minimumReleaseAge: Schema.Finite,
  minimumReleaseAgeExclude: Schema.Array(Schema.String),
  minimumReleaseAgeStrict: Schema.Boolean,
  update: Schema.Struct({ ignoreDeps: Schema.Array(Schema.String) }),
});

/** A held cohort differs from its explicit repository review decision. */
export class DependencyPolicyError extends Schema.TaggedError<DependencyPolicyError>()(
  "DependencyPolicyError",
  { detail: Schema.String }
) {}

/** Reads one structured repository file through its runtime schema. */
const readStructuredFile = Effect.fn("DependencyPolicy.readStructuredFile")(
  function* <A>(
    path: string,
    parseSource: (source: string) => unknown,
    schema: Schema.Codec<A, unknown, never, never>
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const source = yield* fileSystem
      .readFileString(path)
      .pipe(
        Effect.mapError(
          (error) => new DependencyPolicyError({ detail: error.message })
        )
      );
    const input = yield* Effect.try({
      catch: () =>
        new DependencyPolicyError({ detail: `${path} is not valid.` }),
      try: () => parseSource(source),
    });
    return yield* Schema.decodeUnknownEffect(schema)(input).pipe(
      Effect.mapError(
        () =>
          new DependencyPolicyError({ detail: `${path} has an invalid shape.` })
      )
    );
  }
);

/** Returns the reviewed declaration for one held dependency. */
function currentVersion(
  hold: DependencyHold,
  manifest: typeof RootManifestSchema.Type,
  workspace: typeof WorkspaceSchema.Type
) {
  if (hold.source === "catalog") {
    return workspace.catalog[hold.dependency];
  }
  if (hold.source === "root-dev-dependency") {
    return manifest.devDependencies[hold.dependency];
  }
  if (hold.source === "node-runtime") {
    return manifest.devEngines.runtime.version;
  }
  return manifest.packageManager;
}

/** Updates routine packages and proves every explicit hold is still reviewed. */
export const makeBumpDependenciesProgram = Effect.fn("DependencyPolicy.main")(
  function* (config: BumpDependenciesConfig, runner: PnpmRunner = runPnpm) {
    const manifest = yield* readStructuredFile(
      config.manifest,
      JSON.parse,
      RootManifestSchema
    );
    const workspace = yield* readStructuredFile(
      config.workspace,
      parse,
      WorkspaceSchema
    );
    const expectedIgnores = expectedIgnoredDependencies();
    const actualIgnores = [...workspace.update.ignoreDeps].sort();
    const problems: string[] = [];
    if (JSON.stringify(actualIgnores) !== JSON.stringify(expectedIgnores)) {
      problems.push(
        "pnpm update.ignoreDeps does not match the reviewed hold policy."
      );
    }
    if (workspace.minimumReleaseAge !== DEPENDENCY_RELEASE_AGE_MINUTES) {
      problems.push(
        `Dependency releases must mature for exactly ${DEPENDENCY_RELEASE_AGE_MINUTES} minutes.`
      );
    }
    if (!workspace.minimumReleaseAgeStrict) {
      problems.push("Dependency release-age enforcement must remain strict.");
    }
    const expectedExclusions = [...DEPENDENCY_RELEASE_AGE_EXCLUSIONS].sort();
    const actualExclusions = [...workspace.minimumReleaseAgeExclude].sort();
    if (
      JSON.stringify(actualExclusions) !== JSON.stringify(expectedExclusions)
    ) {
      problems.push(
        "pnpm minimumReleaseAgeExclude does not match the reviewed exception policy."
      );
    }
    if (problems.length > 0) {
      return yield* new DependencyPolicyError({ detail: problems.join("\n") });
    }

    const update = yield* runner(config.root, [
      "update",
      "--recursive",
      "--latest",
    ]);
    if (update.exitCode !== 0) {
      return yield* new DependencyCommandError({
        detail: update.stderr.trim() || "pnpm update failed.",
      });
    }

    const reports = yield* Effect.forEach(
      DEPENDENCY_HOLDS,
      (hold) =>
        Effect.gen(function* () {
          const declared = declaredVersion(
            currentVersion(hold, manifest, workspace) ?? ""
          );
          const output = yield* runner(config.root, [
            "view",
            hold.registry,
            "version",
            "--json",
          ]);
          const latest = yield* decodeRegistryVersion(output, hold.registry);
          if (declared !== hold.approvedCurrent) {
            problems.push(
              `${hold.dependency} declares ${declared ?? "no version"}; approved ${hold.approvedCurrent}.`
            );
          }
          if (latest !== hold.reviewedLatest) {
            problems.push(
              `${hold.dependency} upstream is ${latest}; last reviewed ${hold.reviewedLatest}.`
            );
          }
          return { ...hold, current: declared ?? "missing", latest };
        }),
      { concurrency: 4 }
    );

    const outdatedOutput = yield* runner(config.root, [
      "outdated",
      "--recursive",
      "--format",
      "json",
    ]);
    const unresolvedRoutine = yield* decodeOutdatedDependencies(outdatedOutput);
    if (unresolvedRoutine.length > 0) {
      problems.push(
        `Routine dependencies remain outdated: ${unresolvedRoutine.sort().join(", ")}.`
      );
    }

    for (const report of reports) {
      yield* Effect.logInfo(
        `${report.cohort}: ${report.dependency} ${report.current}; reviewed upstream ${report.latest}. ${report.reason}`
      );
    }
    if (problems.length > 0) {
      return yield* new DependencyPolicyError({ detail: problems.join("\n") });
    }

    yield* Effect.logInfo(
      `Routine dependencies and every reviewed hold are current under the repository's ${DEPENDENCY_RELEASE_AGE_MINUTES / 60}-hour release-maturity policy.`
    );
    return reports;
  }
);

NodeRuntime.runMain(
  makeBumpDependenciesProgram(DEFAULT_CONFIG).pipe(
    Effect.provide(NodeServices.layer)
  )
);
