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
import { describe, expect, it } from "vitest";
import { buildRollbackRelease } from "#publisher/rollback/release";
import { rendererManifest } from "#test/publication";
import {
  makeDerivedDelete,
  makeDerivedMaterial,
  makeDerivedTransition,
} from "#test/rollback/spec";

describe("buildRollbackRelease", () => {
  it("derives an upsert release, artifact, projection, result, and snapshot", async () => {
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
    const resultSummary = await Effect.runPromise(
      digestResultCatalog(releaseId, Stream.make(prior.head))
    );
    const prepared = await Effect.runPromise(
      buildRollbackRelease({
        active: {
          activeAppLocales: ACTIVE_APP_LOCALES,
          manifestHash: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
          releaseId: ReleaseIdSchema.make("test-build-base"),
          resultCount: 0,
          resultDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        },
        records: () => Stream.make(record),
        releaseId,
        rendererManifest,
        result: () => Stream.make(prior.head),
        routes: () => Stream.empty,
        scope: {
          content: [
            {
              artifactLocale: prior.head.artifactLocale,
              contentKey: prior.head.contentKey,
              family: prior.head.family,
            },
          ],
          families: [],
          snapshots: [],
        },
        target: {
          activeAppLocales: ACTIVE_APP_LOCALES,
          snapshots: invertContentSnapshots(inheritContentSnapshots(null)),
        },
      })
    );
    const [artifacts, items, projections] = await Effect.runPromise(
      Effect.all([
        prepared.artifacts().pipe(Stream.runCollect),
        prepared.items().pipe(Stream.runCollect),
        prepared.projections().pipe(Stream.runCollect),
      ])
    );

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
  });
});
