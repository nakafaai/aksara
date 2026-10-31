import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseManifest } from "@nakafa/aksara-contracts/release";
import { ed25519PublicKeyPem } from "@nakafa/aksara-contracts/signature/key";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { StageSnapshotBatchInputSchema } from "@nakafa/aksara-contracts/transport/snapshot";
import { prepareProgramSnapshot } from "@nakafa/aksara-corpus/program/snapshot";
import {
  PublicationActivation,
  PublicationRetention,
  PublicationSigningKey,
  PublicationSource,
  PublicationTarget,
} from "@nakafa/aksara-publisher/publication/spec";
import { PublicationTargetTransportError } from "@nakafa/aksara-publisher/target/errors";
import { Array as Arr, Effect, Redacted, Schema, Stream } from "effect";
import { encodeJsonText } from "@nakafa/aksara-utilities/text/json";
import {
  completedBundle,
  gitBundle,
  makeProductionTarget,
  receiptFor,
} from "#test/target";

/** Observations the acceptance mocks write; the publication test reads and sets them. */
const AcceptancePublicationCallsSchema = Schema.Struct({
  allowInsecureLoopback: Schema.mutableKey(Schema.Boolean),
  cacheDrained: Schema.mutableKey(Schema.Finite),
  endpoint: Schema.mutableKey(Schema.String),
  keyMatches: Schema.mutableKey(Schema.Boolean),
  published: Schema.mutableKey(Schema.Finite),
  recoveryId: Schema.mutableKey(Schema.String),
  snapshotAttempts: Schema.mutableKey(Schema.Finite),
  snapshotFailures: Schema.mutableKey(Schema.Finite),
  snapshotInputs: Schema.mutableKey(
    Schema.mutable(Schema.Array(Schema.String))
  ),
  sourceRoot: Schema.mutableKey(Schema.String),
  target: Schema.mutableKey(Schema.Literals(["empty", "active", "candidate"])),
  targetReads: Schema.mutableKey(Schema.Finite),
  timeout: Schema.mutableKey(Schema.String),
});
export type AcceptancePublicationCalls =
  typeof AcceptancePublicationCallsSchema.Type;

/** The pre-existing release that the acceptance target reports, hashed once for the process. */
const PREEXISTING_BUNDLE = await Effect.runPromise(
  gitBundle("test-preexisting-release")
);
/** The same pre-existing release as the terminal active record of the target. */
const PREEXISTING_ACTIVE = await Effect.runPromise(
  completedBundle(PREEXISTING_BUNDLE)
);

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
        return {
          active: calls.target === "active" ? PREEXISTING_ACTIVE : null,
          candidate:
            calls.target === "candidate"
              ? { ...PREEXISTING_BUNDLE, phase: "staging" }
              : null,
          recovery: null,
        };
      });
      return Effect.succeed(
        PublicationTarget.of({
          ...target,
          stageSnapshotBatch: (batch) =>
            Effect.suspend(() => {
              calls.snapshotAttempts += 1;
              calls.snapshotInputs = Arr.append(
                calls.snapshotInputs,
                encodeJsonText(batch)
              );
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
        const retention = yield* PublicationRetention;
        calls.recoveryId =
          retention.kind === "inverse" ? retention.recoveryId : "";
        yield* PublicationSource;
        const target = yield* PublicationTarget;
        const resolved = yield* resolver.resolve(
          SigningKeyIdSchema.make(signingKey.keyId)
        );
        calls.keyMatches =
          resolved ===
          (yield* ed25519PublicKeyPem(
            Redacted.value(signingKey.privateKeyPem)
          ));
        const frozen = yield* gitBundle(prepared.manifest.releaseId);
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
          rows: Arr.map(rows, (record) => ({ family: "program", record })),
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
        return yield* receiptFor(prepared.manifest);
      }
    ),
  };
}
