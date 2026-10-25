import {
  Array as Arr,
  Clock,
  Effect,
  pipe,
  Record as Rec,
  Schema,
} from "effect";
import {
  type BunRunner,
  DependencyCommandError,
  decodeRegistryVersion,
  runBun,
} from "#scripts/dependencies/command";
import {
  DependencyPolicyError,
  type RootManifest,
  readManifest,
  writeManifest,
} from "#scripts/dependencies/manifest";
import { defaultBumpConfig } from "#scripts/dependencies/paths";
import {
  DEPENDENCY_HOLDS,
  type DependencyHold,
  DependencyHoldSchema,
  declaredVersion,
  expectedIgnoredDependencies,
} from "#scripts/dependencies/policy";
import {
  decodeReleaseTimes,
  newestAdmittedRelease,
} from "#scripts/dependencies/release";
import { runEntry } from "#scripts/entry";

const BumpDependenciesConfigSchema = Schema.Struct({
  manifest: Schema.String,
  root: Schema.String,
});

/** Paths of the repository files that the dependency policy reads and updates. */
export type BumpDependenciesConfig = typeof BumpDependenciesConfigSchema.Type;

const RoutineSectionSchema = Schema.Literals([
  "catalog",
  "devDependencies",
  "overrides",
]);

/** One routine declaration. Its package is the registry name that its key pins. */
const RoutineDependencySchema = Schema.Struct({
  current: Schema.String,
  dependency: Schema.String,
  packageName: Schema.String,
  section: RoutineSectionSchema,
});

type RoutineDependency = typeof RoutineDependencySchema.Type;

/** One routine declaration whose registry latest differs from the manifest. */
const RoutineUpdateSchema = Schema.Struct({
  ...RoutineDependencySchema.fields,
  latest: Schema.String,
});
type RoutineUpdate = typeof RoutineUpdateSchema.Type;

/** A reviewed hold with the version the manifest declares and the registry latest. */
const HoldReviewSchema = Schema.Struct({
  ...DependencyHoldSchema.fields,
  current: Schema.String,
  latest: Schema.String,
});
type HoldReview = typeof HoldReviewSchema.Type;

/** Returns the manifest declaration that one reviewed hold reads. */
function currentVersion(hold: DependencyHold, manifest: RootManifest) {
  if (hold.source === "catalog") {
    return manifest.workspaces.catalog[hold.dependency];
  }
  if (hold.source === "override") {
    return manifest.overrides[hold.dependency];
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

/** Returns the package that an override key pins: its last `parent>` segment without a version. */
function overriddenPackage(key: string): string {
  const segment = key.slice(key.lastIndexOf(">") + 1);
  const versionStart = segment.indexOf("@", 1);
  return versionStart === -1 ? segment : segment.slice(0, versionStart);
}

/** Lists the declarations that routine updates may move, excluding every reviewed hold. */
function routineDependencies(
  manifest: RootManifest
): readonly RoutineDependency[] {
  const held = expectedIgnoredDependencies();
  const catalog = pipe(
    Rec.toEntries(manifest.workspaces.catalog),
    Arr.filter(([dependency]) => !Arr.contains(held, dependency)),
    Arr.map(([dependency, current]) => ({
      current,
      dependency,
      packageName: dependency,
      section: "catalog" as const,
    }))
  );
  const direct = pipe(
    Rec.toEntries(manifest.devDependencies),
    Arr.filter(
      ([dependency, spec]) =>
        !(
          Arr.contains(held, dependency) ||
          spec.startsWith("catalog:") ||
          spec.startsWith("workspace:")
        )
    ),
    Arr.map(([dependency, current]) => ({
      current,
      dependency,
      packageName: dependency,
      section: "devDependencies" as const,
    }))
  );
  const overridden = pipe(
    Rec.toEntries(manifest.overrides),
    Arr.filter(([key]) => !Arr.contains(held, key)),
    Arr.map(([key, current]) => ({
      current,
      dependency: key,
      packageName: overriddenPackage(key),
      section: "overrides" as const,
    }))
  );
  return [...catalog, ...direct, ...overridden];
}

/**
 * Keeps the routine declarations whose newest release that the one-day gate
 * admits differs from the manifest. Bun's `@latest` ignores the gate, so the
 * release times decide the candidate.
 */
const planRoutineUpdates = Effect.fn("DependencyPolicy.planRoutineUpdates")(
  function* (
    dependencies: readonly RoutineDependency[],
    root: string,
    runner: BunRunner
  ) {
    const now = yield* Clock.currentTimeMillis;
    const planned = yield* Effect.forEach(
      dependencies,
      (dependency) =>
        Effect.gen(function* () {
          const output = yield* runner(root, [
            "info",
            dependency.packageName,
            "time",
            "--json",
          ]);
          const times = yield* decodeReleaseTimes(
            output,
            dependency.packageName
          );
          const latest = yield* Effect.fromOption(
            newestAdmittedRelease(times, now)
          ).pipe(
            Effect.mapError(
              () =>
                new DependencyPolicyError({
                  message: `${dependency.packageName} has no stable release older than the one-day release-age gate.`,
                })
            )
          );
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
    pipe(
      updates,
      Arr.filter((update) => update.section === section),
      Arr.map((update) => [update.dependency, update.latest] as const)
    )
  );
}

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
      yield* writeManifest(config.manifest, document, fields, {
        catalog: declaredUpdates(updates, "catalog"),
        devDependencies: declaredUpdates(updates, "devDependencies"),
        overrides: declaredUpdates(updates, "overrides"),
      });
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
            Arr.map(
              updates,
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
