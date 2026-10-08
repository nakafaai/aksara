import { describe, expect, it } from "@effect/vitest";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { digestResultCatalog } from "@nakafa/aksara-contracts/release/result/digest";
import {
  inheritContentSnapshots,
  invertContentSnapshots,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Stream } from "effect";
import { buildRollbackRelease } from "#publisher/rollback/release";
import { rendererManifest } from "#test/publication";
import {
  makeDerivedDelete,
  makeDerivedMaterial,
  makeDerivedTransition,
} from "#test/rollback/spec";

describe("buildRollbackRelease", () => {
  it.effect(
    "pins one set of rollback digests for the same records in two chunkings",
    () =>
      Effect.gen(function* () {
        const releaseId = ReleaseIdSchema.make("test-build-rollback-chunks");
        /** Builds one retained prior state and its rollback record for the release. */
        const restored = (
          contentKey: string,
          index: number,
          hashCharacter: string,
          publicPath: string
        ) => {
          const prior = makeDerivedMaterial({
            contentKey,
            hashCharacter,
            index,
            publicPath,
            releaseId,
          });
          const current = makeDerivedDelete({ contentKey, index });
          return {
            head: prior.head,
            record: makeDerivedTransition(current, prior.state),
          };
        };
        const first = restored(
          "test:build-rollback-chunks",
          0,
          "d",
          "subjects/test/build-rollback-chunks"
        );
        const second = restored(
          "test:build-rollback-chunks-b",
          1,
          "e",
          "subjects/test/build-rollback-chunks-b"
        );
        /** Builds one rollback release in one stream chunking and returns its digests. */
        const digestsFor = Effect.fn("RollbackReleaseTest.digestsFor")(
          function* (chunk: number) {
            const prepared = yield* buildRollbackRelease({
              active: {
                activeAppLocales: ACTIVE_APP_LOCALES,
                manifestHash: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
                releaseId: ReleaseIdSchema.make("test-build-base"),
                resultCount: 0,
                resultDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
              },
              records: Stream.make(first.record, second.record).pipe(
                Stream.rechunk(chunk)
              ),
              releaseId,
              rendererManifest,
              result: Stream.make(first.head, second.head).pipe(
                Stream.rechunk(chunk)
              ),
              routes: Stream.empty,
              scope: {
                families: ["material"],
                snapshots: [],
              },
              target: {
                activeAppLocales: ACTIVE_APP_LOCALES,
                snapshots: invertContentSnapshots(
                  inheritContentSnapshots(null)
                ),
              },
            });
            const {
              itemsDigest,
              projectionDigest,
              resultDigest,
              rollbackDigest,
            } = prepared.manifest;
            return {
              itemsDigest,
              projectionDigest,
              resultDigest,
              rollbackDigest,
            };
          }
        );
        expect(yield* digestsFor(1)).toMatchInlineSnapshot(`
          {
            "itemsDigest": "sha256:2559c34f1e214adffbb70d5f1bdaa4a5a4903f5f4bfa7e81a0ffbff75f8eb33c",
            "projectionDigest": "sha256:84c12a40f3ea688aa535ceed6e2ec0210ace90fd209611db9ab367ab0c85618e",
            "resultDigest": "sha256:eae66baf46a60c9120e1cf8b75ae76f12463ddeacfc5176ab856eef67fa3a73b",
            "rollbackDigest": "sha256:96209b9edd85ef2c73bc326091ed184eddd11b3b86bad772b379c14f29b09569",
          }
        `);
        expect(yield* digestsFor(2)).toMatchInlineSnapshot(`
          {
            "itemsDigest": "sha256:2559c34f1e214adffbb70d5f1bdaa4a5a4903f5f4bfa7e81a0ffbff75f8eb33c",
            "projectionDigest": "sha256:84c12a40f3ea688aa535ceed6e2ec0210ace90fd209611db9ab367ab0c85618e",
            "resultDigest": "sha256:eae66baf46a60c9120e1cf8b75ae76f12463ddeacfc5176ab856eef67fa3a73b",
            "rollbackDigest": "sha256:96209b9edd85ef2c73bc326091ed184eddd11b3b86bad772b379c14f29b09569",
          }
        `);
      })
  );

  it.effect(
    "derives an upsert release, artifact, projection, result, and snapshot",
    () =>
      Effect.gen(function* () {
        const releaseId = ReleaseIdSchema.make("test-build-rollback");
        const prior = makeDerivedMaterial({
          contentKey: "test:build-rollback",
          hashCharacter: "d",
          index: 0,
          publicPath: "subjects/test/build-rollback",
          releaseId,
        });
        const current = makeDerivedDelete({
          contentKey: "test:build-rollback",
          index: 0,
        });
        const record = makeDerivedTransition(current, prior.state);
        const resultSummary = yield* digestResultCatalog(
          releaseId,
          Stream.make(prior.head)
        );
        const prepared = yield* buildRollbackRelease({
          active: {
            activeAppLocales: ACTIVE_APP_LOCALES,
            manifestHash: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
            releaseId: ReleaseIdSchema.make("test-build-base"),
            resultCount: 0,
            resultDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
          },
          records: Stream.make(record),
          releaseId,
          rendererManifest,
          result: Stream.make(prior.head),
          routes: Stream.empty,
          scope: {
            families: ["material"],
            snapshots: [],
          },
          target: {
            activeAppLocales: ACTIVE_APP_LOCALES,
            snapshots: invertContentSnapshots(inheritContentSnapshots(null)),
          },
        });
        const [artifacts, items, projections] = yield* Effect.all([
          prepared.artifacts.pipe(Stream.runCollect),
          prepared.items.pipe(Stream.runCollect),
          prepared.projections.pipe(Stream.runCollect),
        ]);

        expect(prepared.manifest).toMatchObject({
          itemCount: 1,
          projectionCount: 1,
          resultCount: resultSummary.count,
          resultDigest: resultSummary.digest,
          rollbackCount: 1,
          upsertCount: 1,
        });
        expect([...artifacts]).toEqual([prior.state.artifact]);
        expect([...items][0]?.change.operation).toBe("upsert");
        expect([...projections]).toEqual([prior.state.projection]);
      })
  );
});
