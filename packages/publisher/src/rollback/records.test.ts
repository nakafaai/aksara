import { describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  type RollbackRecord,
  RollbackRecordSchema,
  RollbackUpsertStateSchema,
} from "@nakafa/aksara-contracts/release/rollback/spec";
import { Effect, Stream } from "effect";
import {
  encodeReplayRecord,
  MAX_REPLAY_RECORD_BYTES,
} from "#publisher/replay/record";
import {
  isDerivedRollbackUpsert,
  snapshotRollbackState,
} from "#publisher/rollback/records";
import { collectPagePublication } from "#test/page/publication";
import { pageTestLayer } from "#test/page/spec";
import { collectQuestionPublication } from "#test/question/spec";
import {
  collectRollbackRecords,
  currentRollbackReleaseId,
  incompatibleRollbackArtifact,
  incompatibleRollbackUpsert,
  makeDerivedRollbackUpsert,
  makeLargeRollbackRecord,
  makeRollbackRendererManifest,
  matchingRollbackDeletion,
  priorRollbackReleaseId,
  rollbackArtifact,
  rollbackDeletion,
  rollbackDeletionRecord,
  rollbackProjection,
  rollbackUpsert,
  rollbackUpsertRecord,
  tamperRollbackSignature,
} from "#test/rollback/authentication";

type RollbackFailureCase = readonly [
  label: string,
  record: RollbackRecord,
  expectedTag: string,
  policy: "compatible" | "integrity-current",
];

const rollbackFailureCases = [
  [
    "rejects a signature that no longer authenticates the old envelope",
    RollbackRecordSchema.make({
      current: RollbackUpsertStateSchema.make({
        ...rollbackUpsert,
        artifact: {
          ...rollbackArtifact,
          signature: tamperRollbackSignature(rollbackArtifact.signature),
        },
      }),
      index: 0,
      prior: rollbackUpsert,
    }),
    "SignatureInvalidError",
    "compatible",
  ],
  [
    "rejects an authenticated artifact paired with another item hash",
    {
      current: {
        artifact: rollbackArtifact,
        change: {
          ...rollbackUpsert.change,
          artifactHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        },
        projection: rollbackProjection,
      },
      index: 0,
      prior: rollbackUpsert,
    },
    "ReleaseArtifactMismatchError",
    "compatible",
  ],
  [
    "rejects tampered recovery current state under integrity-only verification",
    RollbackRecordSchema.make({
      current: RollbackUpsertStateSchema.make({
        ...incompatibleRollbackUpsert,
        artifact: {
          ...incompatibleRollbackArtifact,
          signature: tamperRollbackSignature(
            incompatibleRollbackArtifact.signature
          ),
        },
      }),
      index: 0,
      prior: matchingRollbackDeletion,
    }),
    "SignatureInvalidError",
    "integrity-current",
  ],
  [
    "rejects a restored prior artifact incompatible with the candidate",
    RollbackRecordSchema.make({
      current: matchingRollbackDeletion,
      index: 0,
      prior: incompatibleRollbackUpsert,
    }),
    "ArtifactRendererComponentMissingError",
    "integrity-current",
  ],
  [
    "rejects source current state incompatible with its proof renderer",
    RollbackRecordSchema.make({
      current: incompatibleRollbackUpsert,
      index: 0,
      prior: matchingRollbackDeletion,
    }),
    "ArtifactRendererComponentMissingError",
    "compatible",
  ],
] as const satisfies readonly RollbackFailureCase[];

describe("deriveRollbackRecords", () => {
  it.effect("authenticates upserts and preserves body-free deletes", () =>
    Effect.gen(function* () {
      const [derivedUpsert, derivedDelete] = yield* collectRollbackRecords(
        Stream.make(rollbackUpsertRecord, rollbackDeletionRecord)
      );
      expect(derivedUpsert).toMatchObject({
        current: {
          artifact: rollbackArtifact,
          item: {
            change: rollbackUpsert.change,
            index: 0,
            releaseId: currentRollbackReleaseId,
          },
          kind: "upsert",
          projection: rollbackProjection,
        },
        prior: {
          artifact: rollbackArtifact,
          item: {
            change: rollbackUpsert.change,
            index: 0,
            releaseId: priorRollbackReleaseId,
          },
          kind: "upsert",
          projection: rollbackProjection,
        },
      });
      expect(derivedDelete).toEqual({
        current: {
          item: {
            change: rollbackDeletion.change,
            index: 1,
            releaseId: currentRollbackReleaseId,
          },
          kind: "delete",
        },
        prior: {
          item: {
            change: rollbackDeletion.change,
            index: 1,
            releaseId: priorRollbackReleaseId,
          },
          kind: "delete",
        },
      });
      expect(
        derivedUpsert && isDerivedRollbackUpsert(derivedUpsert.current)
      ).toBe(true);
      expect(
        derivedDelete && isDerivedRollbackUpsert(derivedDelete.current)
      ).toBe(false);
    })
  );

  it.effect(
    "reconstructs an article head from an authenticated article state",
    () =>
      Effect.gen(function* () {
        const [derived] = yield* collectRollbackRecords(
          Stream.make(rollbackUpsertRecord)
        );
        if (!(derived && isDerivedRollbackUpsert(derived.current))) {
          return yield* Effect.die("Expected one derived article upsert.");
        }
        const state = {
          ...derived.current,
          item: {
            ...derived.current.item,
            change: {
              ...derived.current.item.change,
              family: "article" as const,
            },
          },
        };
        expect(snapshotRollbackState(state)).toMatchObject({
          head: { family: "article" },
          state: "article",
        });
      })
  );

  it.effect(
    "reconstructs a route-free question head from a real question state",
    () =>
      Effect.gen(function* () {
        const [transition] = yield* Effect.tryPromise(() =>
          collectQuestionPublication({ heads: [] })
        );
        if (!(transition && "payload" in transition.record)) {
          return yield* Effect.die("Expected one question publication upsert.");
        }
        const state = makeDerivedRollbackUpsert(transition.record);
        expect(snapshotRollbackState(state)).toMatchObject({
          head: { family: "question", publicPath: undefined },
          state: "question",
        });
      })
  );

  it.effect("reconstructs a page head from a real page state", () =>
    Effect.gen(function* () {
      const [transition] = yield* collectPagePublication({ heads: [] }).pipe(
        Effect.provide(pageTestLayer)
      );
      if (!(transition && "payload" in transition.record)) {
        return yield* Effect.die("Expected one page publication upsert.");
      }
      const state = makeDerivedRollbackUpsert(transition.record);
      expect(snapshotRollbackState(state)).toMatchObject({
        head: { family: "page" },
        state: "page",
      });
    })
  );

  it.effect(
    "spools a valid rollback transition containing two near-limit bodies",
    () =>
      Effect.gen(function* () {
        const record = yield* makeLargeRollbackRecord();
        const [derived] = yield* collectRollbackRecords(Stream.make(record));
        expect(derived).toBeDefined();
        const encoded = yield* encodeReplayRecord(derived, 0);
        expect(encoded.bytes).toBeGreaterThan(1024 * 1024);
        expect(encoded.bytes).toBeLessThanOrEqual(MAX_REPLAY_RECORD_BYTES);
      })
  );

  it.effect(
    "authenticates recovery current state without candidate compatibility",
    () =>
      Effect.gen(function* () {
        const record = RollbackRecordSchema.make({
          current: incompatibleRollbackUpsert,
          index: 0,
          prior: matchingRollbackDeletion,
        });
        const rendererManifest = yield* makeRollbackRendererManifest();
        const records = yield* collectRollbackRecords(Stream.make(record), {
          currentPolicy: { kind: "integrity" },
          priorPolicy: { kind: "compatible", rendererManifest },
        });
        const [derived] = records;

        expect(derived?.current).toMatchObject({
          artifact: incompatibleRollbackArtifact,
          kind: "upsert",
        });
      })
  );

  it.effect.each(rollbackFailureCases)(
    "%s",
    ([, record, expectedTag, policy]) =>
      Effect.gen(function* () {
        const policies =
          policy === "compatible"
            ? undefined
            : {
                currentPolicy: { kind: "integrity" as const },
                priorPolicy: {
                  kind: "compatible" as const,
                  rendererManifest: yield* makeRollbackRendererManifest(),
                },
              };
        expect(
          yield* collectRollbackRecords(Stream.make(record), policies).pipe(
            Effect.flip
          )
        ).toMatchObject({ _tag: expectedTag });
      })
  );
});
