import { NodeRuntime, NodeServices } from "@effect/platform-node";
import {
  Array as Arr,
  Effect,
  Equivalence,
  FileSystem,
  Order,
  Ref,
  Schema,
} from "effect";
import { parse } from "yaml";
import {
  DependencyCommandError,
  decodeOutdatedDependencies,
  decodeRegistryVersion,
  type PnpmRunner,
  runPnpm,
} from "#scripts/dependencies/command";
import { defaultBumpConfig } from "#scripts/dependencies/paths";
import {
  DEPENDENCY_HOLDS,
  type DependencyHold,
  declaredVersion,
  expectedIgnoredDependencies,
} from "#scripts/dependencies/policy";

const BumpDependenciesConfigSchema = Schema.Struct({
  manifest: Schema.String,
  root: Schema.String,
  workspace: Schema.String,
});

/** Paths of the repository files that the dependency policy reads and updates. */
export type BumpDependenciesConfig = typeof BumpDependenciesConfigSchema.Type;

const RootManifestSchema = Schema.Struct({
  devDependencies: Schema.Record(Schema.String, Schema.String),
  devEngines: Schema.Struct({
    runtime: Schema.Struct({ version: Schema.String }),
  }),
  packageManager: Schema.String,
});

const WorkspaceSchema = Schema.Struct({
  catalog: Schema.Record(Schema.String, Schema.String),
  update: Schema.Struct({ ignoreDeps: Schema.Array(Schema.String) }),
});

const parseJson = Schema.decodeSync(Schema.fromJsonString(Schema.Unknown));

/** A held cohort differs from its explicit repository review decision. */
export class DependencyPolicyError extends Schema.TaggedError<DependencyPolicyError>()(
  "DependencyPolicyError",
  { message: Schema.String }
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
          (error) => new DependencyPolicyError({ message: error.message })
        )
      );
    const input = yield* Effect.try({
      catch: () =>
        new DependencyPolicyError({ message: `${path} is not valid.` }),
      try: () => parseSource(source),
    });
    return yield* Schema.decodeUnknownEffect(schema)(input).pipe(
      Effect.mapError(
        () =>
          new DependencyPolicyError({
            message: `${path} has an invalid shape.`,
          })
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
      parseJson,
      RootManifestSchema
    );
    const workspace = yield* readStructuredFile(
      config.workspace,
      parse,
      WorkspaceSchema
    );
    const expectedIgnores = expectedIgnoredDependencies();
    const actualIgnores = Arr.sort(workspace.update.ignoreDeps, Order.String);
    if (
      !Equivalence.Array(Equivalence.String)(actualIgnores, expectedIgnores)
    ) {
      return yield* new DependencyPolicyError({
        message:
          "pnpm update.ignoreDeps does not match the reviewed hold policy.",
      });
    }

    const update = yield* runner(config.root, [
      "update",
      "--recursive",
      "--latest",
    ]);
    if (update.exitCode !== 0) {
      return yield* new DependencyCommandError({
        message: update.stderr.trim() || "pnpm update failed.",
      });
    }

    const problems = yield* Ref.make<readonly string[]>([]);
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
            yield* Ref.update(
              problems,
              Arr.append(
                `${hold.dependency} declares ${declared ?? "no version"}; approved ${hold.approvedCurrent}.`
              )
            );
          }
          if (latest !== hold.reviewedLatest) {
            yield* Ref.update(
              problems,
              Arr.append(
                `${hold.dependency} upstream is ${latest}; last reviewed ${hold.reviewedLatest}.`
              )
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
      yield* Ref.update(
        problems,
        Arr.append(
          `Routine dependencies remain outdated: ${Arr.join(Arr.sort(unresolvedRoutine, Order.String), ", ")}.`
        )
      );
    }

    for (const report of reports) {
      yield* Effect.logInfo(
        `${report.cohort}: ${report.dependency} ${report.current}; reviewed upstream ${report.latest}. ${report.reason}`
      );
    }
    const found = yield* Ref.get(problems);
    if (found.length > 0) {
      return yield* new DependencyPolicyError({
        message: Arr.join(found, "\n"),
      });
    }

    yield* Effect.logInfo(
      "Routine dependencies and every reviewed hold are current."
    );
    return reports;
  }
);

NodeRuntime.runMain(
  defaultBumpConfig.pipe(
    Effect.flatMap(makeBumpDependenciesProgram),
    Effect.provide(NodeServices.layer)
  )
);
