import {
  Array as Arr,
  Effect,
  FileSystem,
  Record as Rec,
  Schema,
} from "effect";
import {
  type BunRunner,
  DependencyCommandError,
  decodeRegistryVersion,
  runBun,
} from "#scripts/dependencies/command";
import { defaultBumpConfig } from "#scripts/dependencies/paths";
import {
  DEPENDENCY_HOLDS,
  type DependencyHold,
  declaredVersion,
  expectedIgnoredDependencies,
} from "#scripts/dependencies/policy";
import { runEntry } from "#scripts/entry";
import { readSource } from "#scripts/source";

const BumpDependenciesConfigSchema = Schema.Struct({
  manifest: Schema.String,
  root: Schema.String,
});

/** Paths of the repository files that the dependency policy reads and updates. */
export type BumpDependenciesConfig = typeof BumpDependenciesConfigSchema.Type;

const JsonObject = Schema.fromJsonString(
  Schema.Record(Schema.String, Schema.Unknown)
);

/** The root manifest fields that the dependency policy reads and writes. */
const RootManifestSchema = Schema.Struct({
  devDependencies: Schema.Record(Schema.String, Schema.String),
  devEngines: Schema.Struct({
    runtime: Schema.Struct({ version: Schema.String }),
  }),
  packageManager: Schema.String,
  workspaces: Schema.Struct({
    catalog: Schema.Record(Schema.String, Schema.String),
    packages: Schema.Array(Schema.String),
  }),
});

type RootManifest = typeof RootManifestSchema.Type;

const RoutineSectionSchema = Schema.Literals(["catalog", "devDependencies"]);

const RoutineDependencySchema = Schema.Struct({
  current: Schema.String,
  dependency: Schema.String,
  section: RoutineSectionSchema,
});

type RoutineDependency = typeof RoutineDependencySchema.Type;

/** One routine declaration whose registry latest differs from the manifest. */
type RoutineUpdate = RoutineDependency & { readonly latest: string };

/** A reviewed hold with the version the manifest declares and the registry latest. */
type HoldReview = DependencyHold & {
  readonly current: string;
  readonly latest: string;
};

/** A dependency policy check failed: a reviewed hold drifted or the manifest is not valid. */
class DependencyPolicyError extends Schema.TaggedError<
  DependencyPolicyError,
  { readonly brand: unique symbol }
>()("DependencyPolicyError", { message: Schema.String }) {}

/** Reads the root manifest as an open JSON object and as the fields the policy owns. */
const readManifest = Effect.fn("DependencyPolicy.readManifest")(function* (
  path: string
) {
  const source = yield* readSource(path).pipe(
    Effect.mapError(
      (error) => new DependencyPolicyError({ message: error.message })
    )
  );
  const document = yield* Schema.decodeEffect(JsonObject)(source).pipe(
    Effect.mapError(
      () => new DependencyPolicyError({ message: `${path} is not valid.` })
    )
  );
  const fields = yield* Schema.decodeUnknownEffect(RootManifestSchema)(
    document
  ).pipe(
    Effect.mapError(
      () =>
        new DependencyPolicyError({
          message: `${path} has an invalid shape.`,
        })
    )
  );
  return { document, fields };
});

/** Returns the manifest declaration that one reviewed hold reads. */
function currentVersion(hold: DependencyHold, manifest: RootManifest) {
  if (hold.source === "catalog") {
    return manifest.workspaces.catalog[hold.dependency];
  }
  if (hold.source === "root-dev-dependency") {
    return manifest.devDependencies[hold.dependency];
  }
  if (hold.source === "node-runtime") {
    return manifest.devEngines.runtime.version;
  }
  return manifest.packageManager;
}

/** Reads the declared version and the registry latest of one reviewed hold. */
const reviewHold = Effect.fn("DependencyPolicy.reviewHold")(function* (
  hold: DependencyHold,
  manifest: RootManifest,
  root: string,
  runner: BunRunner
) {
  const output = yield* runner(root, [
    "info",
    hold.registry,
    "version",
    "--json",
  ]);
  const latest = yield* decodeRegistryVersion(output, hold.registry);
  return {
    ...hold,
    current: declaredVersion(currentVersion(hold, manifest) ?? "") ?? "missing",
    latest,
  } satisfies HoldReview;
});

/** Lists every way one reviewed hold differs from its approval and its reviewed upstream. */
function holdProblems(review: HoldReview): readonly string[] {
  return [
    ...(review.current === review.approvedCurrent
      ? []
      : [
          `${review.dependency} declares ${review.current}; approved ${review.approvedCurrent}.`,
        ]),
    ...(review.latest === review.reviewedLatest
      ? []
      : [
          `${review.dependency} upstream is ${review.latest}; last reviewed ${review.reviewedLatest}.`,
        ]),
  ];
}

/** Lists the declarations that routine updates may move, excluding every reviewed hold. */
function routineDependencies(
  manifest: RootManifest
): readonly RoutineDependency[] {
  const held = expectedIgnoredDependencies();
  const catalog = Rec.toEntries(manifest.workspaces.catalog)
    .filter(([dependency]) => !Arr.contains(held, dependency))
    .map(([dependency, current]) => ({
      current,
      dependency,
      section: "catalog" as const,
    }));
  const direct = Rec.toEntries(manifest.devDependencies)
    .filter(
      ([dependency, spec]) =>
        !(
          Arr.contains(held, dependency) ||
          spec.startsWith("catalog:") ||
          spec.startsWith("workspace:")
        )
    )
    .map(([dependency, current]) => ({
      current,
      dependency,
      section: "devDependencies" as const,
    }));
  return [...catalog, ...direct];
}

/** Keeps the routine declarations whose registry latest differs from the manifest. */
const planRoutineUpdates = Effect.fn("DependencyPolicy.planRoutineUpdates")(
  function* (
    dependencies: readonly RoutineDependency[],
    root: string,
    runner: BunRunner
  ) {
    const planned = yield* Effect.forEach(
      dependencies,
      (dependency) =>
        Effect.gen(function* () {
          const spec = `${dependency.dependency}@latest`;
          const output = yield* runner(root, [
            "info",
            spec,
            "version",
            "--json",
          ]);
          const latest = yield* decodeRegistryVersion(output, spec);
          return { ...dependency, latest };
        }),
      { concurrency: 4 }
    );
    return Arr.filter(planned, ({ current, latest }) => current !== latest);
  }
);

/** Maps the routine updates of one manifest section to the versions they declare. */
function declaredUpdates(
  updates: readonly RoutineUpdate[],
  section: RoutineDependency["section"]
) {
  return Rec.fromEntries(
    Arr.filter(updates, (update) => update.section === section).map(
      (update) => [update.dependency, update.latest] as const
    )
  );
}

/** Writes the planned declarations into the root manifest and keeps every other field. */
const writeManifest = Effect.fn("DependencyPolicy.writeManifest")(function* (
  path: string,
  document: Readonly<Record<string, unknown>>,
  fields: RootManifest,
  updates: readonly RoutineUpdate[]
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const next = {
    ...document,
    devDependencies: {
      ...fields.devDependencies,
      ...declaredUpdates(updates, "devDependencies"),
    },
    workspaces: {
      ...fields.workspaces,
      catalog: {
        ...fields.workspaces.catalog,
        ...declaredUpdates(updates, "catalog"),
      },
    },
  };
  const text = yield* Schema.encodeEffect(JsonObject)(next);
  yield* fileSystem.writeFileString(path, text);
});

/** Verifies every reviewed hold, moves routine dependencies to their newest release, and refreshes the lock. */
export const makeBumpDependenciesProgram = Effect.fn("DependencyPolicy.main")(
  function* (config: BumpDependenciesConfig, runner: BunRunner = runBun) {
    const { document, fields } = yield* readManifest(config.manifest);
    const reviews = yield* Effect.forEach(
      DEPENDENCY_HOLDS,
      (hold) => reviewHold(hold, fields, config.root, runner),
      { concurrency: 4 }
    );
    const problems = Arr.flatMap(reviews, holdProblems);
    if (problems.length > 0) {
      return yield* new DependencyPolicyError({
        message: Arr.join(problems, "\n"),
      });
    }

    const updates = yield* planRoutineUpdates(
      routineDependencies(fields),
      config.root,
      runner
    );
    if (updates.length > 0) {
      yield* writeManifest(config.manifest, document, fields, updates);
    }

    const refresh = yield* runner(config.root, ["update"]);
    if (refresh.exitCode !== 0) {
      return yield* new DependencyCommandError({
        message: refresh.stderr.trim() || "bun update failed.",
      });
    }

    for (const review of reviews) {
      yield* Effect.logInfo(
        `${review.cohort}: ${review.dependency} ${review.current}; reviewed upstream ${review.latest}. ${review.reason}`
      );
    }
    yield* Effect.logInfo(
      updates.length === 0
        ? "Routine dependencies and every reviewed hold are current."
        : `Updated routine dependencies: ${Arr.join(
            updates.map(
              ({ current, dependency, latest }) =>
                `${dependency} ${current} -> ${latest}`
            ),
            ", "
          )}. Run bun run format to restore the manifest layout.`
    );
    return reviews;
  }
);

runEntry(
  import.meta.main,
  defaultBumpConfig.pipe(Effect.flatMap(makeBumpDependenciesProgram)),
  { failureStream: "stdout" }
);
