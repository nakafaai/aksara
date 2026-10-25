import { Effect, Schema } from "effect";

import type { BunRunner } from "#scripts/dependencies/command";
import type { RootManifest } from "#scripts/dependencies/manifest";
import {
  type DependencyHold,
  DependencyHoldSchema,
  declaredVersion,
} from "#scripts/dependencies/policy";
import { admittedLatest, isNewerRelease } from "#scripts/dependencies/release";

/** A reviewed hold with the version the manifest declares and the newest admitted upstream release. */
const HoldReviewSchema = Schema.Struct({
  ...DependencyHoldSchema.fields,
  current: Schema.String,
  latest: Schema.String,
});

/** One reviewed hold, read from the manifest and from the registry. */
export type HoldReview = typeof HoldReviewSchema.Type;

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

/** Returns the release line that a hold's registry spec names: `24` for `node@24`, none for `@latest`. */
function holdLine(hold: DependencyHold): string | undefined {
  const spec = hold.registry.slice(hold.dependency.length + 1);
  return spec === "latest" ? undefined : spec;
}

/** Reads the declared version and the newest admitted upstream release of one reviewed hold. */
export const reviewHold = Effect.fn("DependencyPolicy.reviewHold")(function* (
  hold: DependencyHold,
  manifest: RootManifest,
  root: string,
  runner: BunRunner
) {
  const latest = yield* admittedLatest(
    hold.dependency,
    holdLine(hold),
    root,
    runner
  );
  return {
    ...hold,
    current: declaredVersion(currentVersion(hold, manifest) ?? "") ?? "missing",
    latest,
  } satisfies HoldReview;
});

/**
 * Lists every way one reviewed hold differs from its approval and its reviewed
 * upstream. A reviewed release that the gate has not admitted yet is current;
 * an admitted release newer than the review must be reviewed.
 */
export function holdProblems(review: HoldReview): readonly string[] {
  return [
    ...(review.current === review.approvedCurrent
      ? []
      : [
          `${review.dependency} declares ${review.current}; approved ${review.approvedCurrent}.`,
        ]),
    ...(isNewerRelease(review.latest, review.reviewedLatest)
      ? [
          `${review.dependency} upstream is ${review.latest}; last reviewed ${review.reviewedLatest}.`,
        ]
      : []),
  ];
}
