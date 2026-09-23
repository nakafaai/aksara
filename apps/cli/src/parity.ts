import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseCurrent } from "@nakafa/aksara-contracts/release/current/state";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect, Schema } from "effect";
import {
  type PublicationEnvironment,
  readPublicationEnvironment,
} from "#cli/environment/read";
import { mapProductionError } from "#cli/failure";
import type { ParityArguments } from "#cli/production/arguments";
import { retryPublicationTarget } from "#cli/retry";

/** Paired targets cannot be accepted while their current content differs. */
export class PublicationParityError extends Schema.TaggedError<PublicationParityError>()(
  "PublicationParityError",
  {
    reason: Schema.Literals([
      "target",
      "active",
      "candidate",
      "recovery",
      "source",
      "renderer",
      "locales",
      "catalog",
      "snapshots",
    ]),
    releaseId: ReleaseIdSchema,
  }
) {
  /** Explains the failed invariant without exposing target credentials. */
  get message() {
    return `Publication parity failed for ${this.releaseId}: ${this.reason}. Inspect both publication states and converge the complete release before acceptance.`;
  }
}

/** Compares complete authenticated result identities, excluding base-history deltas. */
export const verifyPublicationParity = Effect.fn(
  "AksaraCli.verifyPublicationParity"
)(function* (
  args: ParityArguments,
  development: ContentReleaseCurrent,
  production: ContentReleaseCurrent
) {
  const left = development.active;
  const right = production.active;
  if (
    left === null ||
    right === null ||
    left.release.manifest.releaseId !== args.releaseId ||
    right.release.manifest.releaseId !== args.releaseId
  ) {
    return yield* new PublicationParityError({
      reason: "active",
      releaseId: args.releaseId,
    });
  }
  for (const state of [development, production]) {
    if (state.candidate !== null) {
      return yield* new PublicationParityError({
        reason: "candidate",
        releaseId: args.releaseId,
      });
    }
    // A lost acceptance response may leave one inverse already cleared.
    if (
      state.recovery !== null &&
      (state.recovery.release.manifest.releaseId !== args.recoveryId ||
        state.recovery.phase !== "verified")
    ) {
      return yield* new PublicationParityError({
        reason: "recovery",
        releaseId: args.releaseId,
      });
    }
  }
  const a = left.release.manifest;
  const b = right.release.manifest;
  if (
    a.origin.kind !== "git" ||
    b.origin.kind !== "git" ||
    a.origin.sha !== b.origin.sha
  ) {
    return yield* new PublicationParityError({
      reason: "source",
      releaseId: args.releaseId,
    });
  }
  if (left.rendererManifest.hash !== right.rendererManifest.hash) {
    return yield* new PublicationParityError({
      reason: "renderer",
      releaseId: args.releaseId,
    });
  }
  if (
    JSON.stringify([...a.activeAppLocales].sort()) !==
    JSON.stringify([...b.activeAppLocales].sort())
  ) {
    return yield* new PublicationParityError({
      reason: "locales",
      releaseId: args.releaseId,
    });
  }
  if (a.resultCount !== b.resultCount || a.resultDigest !== b.resultDigest) {
    return yield* new PublicationParityError({
      reason: "catalog",
      releaseId: args.releaseId,
    });
  }
  if (
    ContentSnapshotKindSchema.literals.some(
      (kind) =>
        a.snapshots[kind].resultSnapshotId !==
        b.snapshots[kind].resultSnapshotId
    )
  ) {
    return yield* new PublicationParityError({
      reason: "snapshots",
      releaseId: args.releaseId,
    });
  }
  return {
    releaseId: a.releaseId,
    resultCount: a.resultCount,
    resultDigest: a.resultDigest,
    sourceSha: a.origin.sha,
  };
});

/** Reads and authenticates one target without signer access or mutation. */
const readParityTarget = Effect.fn("AksaraCli.readParityTarget")(function* (
  environment: PublicationEnvironment
) {
  const rawTarget = yield* makeHttpPublicationTarget({
    activationTimeout: "30 seconds",
    allowInsecureLoopback: false,
    endpoint: environment.publicationEndpoint,
    timeout: "30 seconds",
    token: environment.publicationToken,
  }).pipe(Effect.mapError(mapProductionError("target")));
  const current = yield* retryPublicationTarget(rawTarget).current.pipe(
    Effect.mapError(mapProductionError("state"))
  );
  if (current.active !== null) {
    yield* verifyContentReleaseBundle({
      release: current.active.release,
      rendererManifest: current.active.rendererManifest,
    }).pipe(Effect.mapError(mapProductionError("state")));
  }
  return current;
});

/** Proves full dev/prod parity before acceptance and after paired publication. */
export const runParityCommand = Effect.fn("AksaraCli.runParityCommand")(
  function* (args: ParityArguments) {
    const devEnvironment = yield* readPublicationEnvironment(
      "development"
    ).pipe(Effect.mapError(mapProductionError("environment")));
    const prodEnvironment = yield* readPublicationEnvironment(
      "production"
    ).pipe(Effect.mapError(mapProductionError("environment")));
    if (
      devEnvironment.publicationEndpoint.href ===
      prodEnvironment.publicationEndpoint.href
    ) {
      return yield* new PublicationParityError({
        reason: "target",
        releaseId: args.releaseId,
      });
    }
    const development = yield* readParityTarget(devEnvironment);
    const production = yield* readParityTarget(prodEnvironment);
    const evidence = yield* verifyPublicationParity(
      args,
      development,
      production
    );
    yield* Effect.logInfo(
      "Development and production publication parity verified."
    ).pipe(Effect.annotateLogs(evidence));
    return evidence;
  }
);
