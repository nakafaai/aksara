import type { HttpClient } from "@effect/platform";
import type { ContentReleaseCurrent } from "@nakafa/aksara-contracts/release/current";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect } from "effect";
import { readPublicationEnvironment } from "#cli/env";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { retryPublicationTarget } from "#cli/retry";

const STATUS_TIMEOUT = "30 seconds";

type StatusCommand = Effect.Effect<
  void,
  ProductionError,
  HttpClient.HttpClient
>;

/** Returns a safe operator label for one optional publication slot. */
function slotEvidence(
  slot:
    | ContentReleaseCurrent["active"]
    | ContentReleaseCurrent["candidate"]
    | ContentReleaseCurrent["recovery"]
) {
  if (slot === null) {
    return "empty";
  }
  return `${slot.release.manifest.releaseId}:${slot.release.manifestHash}`;
}

/** Emits only immutable publication identities and candidate phases. */
function logCurrent(current: ContentReleaseCurrent) {
  return Effect.logInfo("Content publication status loaded.").pipe(
    Effect.annotateLogs({
      active: slotEvidence(current.active),
      candidate: slotEvidence(current.candidate),
      candidatePhase: current.candidate?.phase ?? "empty",
      recovery: slotEvidence(current.recovery),
      recoveryPhase: current.recovery?.phase ?? "empty",
    })
  );
}

/** Reads authoritative publication state without requiring signing secrets. */
export const runStatusCommand: () => StatusCommand = Effect.fn(
  "AksaraCli.runStatusCommand"
)(() =>
  Effect.gen(function* () {
    const environment = yield* readPublicationEnvironment().pipe(
      Effect.mapError(mapProductionError("environment"))
    );
    const rawTarget = yield* makeHttpPublicationTarget({
      allowInsecureLoopback: false,
      endpoint: environment.publicationEndpoint,
      timeout: STATUS_TIMEOUT,
      token: environment.publicationToken,
    }).pipe(Effect.mapError(mapProductionError("target")));
    const target = retryPublicationTarget(rawTarget);
    const current = yield* target
      .current()
      .pipe(Effect.mapError(mapProductionError("state")));
    yield* logCurrent(current);
  })
);
