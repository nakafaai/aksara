import { createPublicKey } from "node:crypto";
import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseManifest } from "@nakafa/aksara-contracts/release";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { StageSnapshotBatchInputSchema } from "@nakafa/aksara-contracts/transport/snapshot";
import { prepareProgramSnapshot } from "@nakafa/aksara-corpus/program/snapshot";
import {
  PublicationActivation,
  PublicationRecoveryId,
  PublicationSigningKey,
  PublicationSource,
  PublicationTarget,
} from "@nakafa/aksara-publisher/publication/spec";
import { PublicationTargetTransportError } from "@nakafa/aksara-publisher/target/errors";
import { Effect, Redacted, Schema, Stream } from "effect";
import {
  completedBundle,
  gitBundle,
  makeProductionTarget,
  receiptFor,
} from "#test/target";

interface AcceptancePublicationCalls {
  allowInsecureLoopback: boolean;
  cacheDrained: number;
  endpoint: string;
  keyMatches: boolean;
  published: number;
  recoveryId: string;
  snapshotAttempts: number;
  snapshotFailures: number;
  snapshotInputs: string[];
  target: "empty" | "active" | "candidate";
  targetReads: number;
  timeout: string;
}

/** Supplies native target failures after one exact, real snapshot row is staged. */
export function acceptanceTargetMock(calls: AcceptancePublicationCalls) {
  return {
    /** Captures the real boundary configuration and retries only staged transport. */
    makeHttpPublicationTarget: (input: {
      readonly endpoint: URL;
      readonly allowInsecureLoopback: boolean;
      readonly timeout: string;
    }) => {
      calls.endpoint = input.endpoint.href;
      calls.allowInsecureLoopback = input.allowInsecureLoopback;
      calls.timeout = input.timeout;
      const target = makeProductionTarget(() => {
        calls.targetReads += 1;
        const bundle = gitBundle("test-preexisting-release");
        return {
          active: calls.target === "active" ? completedBundle(bundle) : null,
          candidate:
            calls.target === "candidate"
              ? { ...bundle, phase: "staging" }
              : null,
          recovery: null,
          tryoutRuntimeBundle: null,
        };
      });
      return Effect.succeed(
        PublicationTarget.of({
          ...target,
          stageSnapshotBatch: (batch) =>
            Effect.suspend(() => {
              calls.snapshotAttempts += 1;
              calls.snapshotInputs.push(JSON.stringify(batch));
              return calls.snapshotAttempts <= calls.snapshotFailures
                ? Effect.fail(
                    new PublicationTargetTransportError({
                      detail: { reason: "transient-status", status: 500 },
                      stage: "snapshots",
                    })
                  )
                : Effect.void;
            }),
        })
      );
    },
  };
}

/** Exercises every publication service supplied by the outer acceptance boundary. */
export function acceptancePublicationMock(calls: AcceptancePublicationCalls) {
  return {
    /** Rechecks the frozen renderer and consumes cache transitions before success. */
    publishGitRelease: Effect.fn("AcceptanceTest.publishGitRelease")(
      function* (prepared: { readonly manifest: ContentReleaseManifest }) {
        calls.published += 1;
        const signingKey = yield* PublicationSigningKey;
        const resolver = yield* ContentVerificationKeyResolver;
        const activation = yield* PublicationActivation;
        calls.recoveryId = yield* PublicationRecoveryId;
        yield* PublicationSource;
        const target = yield* PublicationTarget;
        const resolved = yield* resolver.resolve(
          SigningKeyIdSchema.make(signingKey.keyId)
        );
        calls.keyMatches =
          resolved ===
          createPublicKey(Redacted.value(signingKey.privateKeyPem))
            .export({ format: "pem", type: "spki" })
            .toString();
        const frozen = gitBundle(prepared.manifest.releaseId);
        const snapshot = yield* prepareProgramSnapshot().pipe(Effect.orDie);
        const rows = yield* snapshot.rows.pipe(
          Stream.take(1),
          Stream.runCollect,
          Effect.orDie
        );
        const batch = yield* Schema.decodeUnknownEffect(
          StageSnapshotBatchInputSchema
        )({
          batchIndex: 0,
          family: "program",
          releaseId: prepared.manifest.releaseId,
          rows: rows.map((record) => ({ family: "program", record })),
          snapshotId: snapshot.manifest.snapshotId,
        });
        yield* target.stageSnapshotBatch(batch);
        yield* activation.verify(frozen, "exact");
        yield* activation.invalidate({
          cacheChanges: Stream.suspend(() => {
            calls.cacheDrained += 1;
            return Stream.empty;
          }),
          release: frozen.release,
        });
        return receiptFor(prepared.manifest);
      }
    ),
  };
}
