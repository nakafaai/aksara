import { describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { digestProjections } from "@nakafa/aksara-contracts/projection/digest";
import { Effect, Stream } from "effect";
import {
  PublicationActivation,
  PublicationActivationError,
} from "#publisher/publication/spec";
import { makeTarget } from "#test/lifecycle/spec";
import {
  contentRecord,
  makeRelease,
  projection,
  record,
} from "#test/publication";
import { publish, publishPrepared } from "#test/publication/run";

vi.mock("@nakafa/aksara-corpus/material/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/material/registry")
    >();
  const { materialSlicePaths } = await import("#test/material/slice");
  const sourcePaths = new Set<string>(materialSlicePaths);
  return {
    ...original,
    decodeMaterialRegistry: (input?: unknown) =>
      original
        .decodeMaterialRegistry(input)
        .pipe(
          Effect.map((entries) =>
            entries.filter(({ sourcePath }) => sourcePaths.has(sourcePath))
          )
        ),
  };
});

describe("content publication", () => {
  it.effect("stages once, activates once, and returns a completed retry", () =>
    Effect.gen(function* () {
      const release = yield* Effect.promise(() =>
        makeRelease("test-release-idempotent")
      );
      const state = makeTarget(release);
      const first = yield* publish(release, state.target);
      const second = yield* publish(release, state.target);
      expect(second).toEqual(first);
      expect(state.stageGroup).toHaveBeenCalledTimes(2);
      expect(state.stageItemBatch).toHaveBeenCalledTimes(2);
      expect(state.stageRelease).toHaveBeenCalledTimes(2);
      expect(state.stageRecovery).toHaveBeenCalledOnce();
      expect(state.activationTransitions).toBe(1);
    })
  );

  it.effect(
    "invalidates only the exact decoded family and artifact after activation",
    () =>
      Effect.gen(function* () {
        const release = yield* Effect.promise(() =>
          makeRelease("test-release-cache-artifact")
        );
        const state = makeTarget(release);
        let cacheChanges: readonly unknown[] = [];
        let receivedRelease = "";
        const activation = PublicationActivation.of({
          invalidate: ({ cacheChanges: changes, release: signedRelease }) =>
            Stream.runCollect(changes).pipe(
              Effect.tap((values) =>
                Effect.sync(() => {
                  cacheChanges = [...values];
                  receivedRelease = signedRelease.manifest.releaseId;
                })
              ),
              Effect.asVoid
            ),
          verify: () => Effect.void,
        });
        yield* publish(release, state.target, undefined, activation);
        expect(cacheChanges).toEqual([
          {
            artifactHash: contentRecord.change.artifactHash,
            family: "material",
          },
        ]);
        expect(receivedRelease).toBe(release.manifest.releaseId);
      })
  );

  it.effect("repairs failed cache invalidation on exact retry", () =>
    Effect.gen(function* () {
      const release = yield* Effect.promise(() =>
        makeRelease("test-release-cache-retry")
      );
      const state = makeTarget(release);
      const failure = new PublicationActivationError({
        phase: "cache",
        releaseId: release.manifest.releaseId,
      });
      const invalidate = vi
        .fn<() => Effect.Effect<void, PublicationActivationError>>()
        .mockReturnValueOnce(Effect.fail(failure))
        .mockReturnValue(Effect.void);
      const activation = PublicationActivation.of({
        invalidate,
        verify: () => Effect.void,
      });
      const recoveryId = ReleaseIdSchema.make(
        `${release.manifest.releaseId}-recovery`
      );
      expect(
        yield* publish(release, state.target, recoveryId, activation).pipe(
          Effect.flip
        )
      ).toEqual(failure);
      expect(state.snapshot().active?.release.manifest.releaseId).toBe(
        release.manifest.releaseId
      );
      expect(state.abortOrder).toEqual([]);
      expect(
        yield* publish(release, state.target, recoveryId, activation)
      ).toMatchObject({ releaseId: release.manifest.releaseId });
      expect(state.activationTransitions).toBe(1);
      expect(invalidate).toHaveBeenCalledTimes(2);
    })
  );

  it.effect("rejects a recovery identity that aliases the candidate", () =>
    Effect.gen(function* () {
      const release = yield* Effect.promise(() =>
        makeRelease("test-release-alias-candidate")
      );
      const state = makeTarget(release);
      const error = yield* publish(
        release,
        state.target,
        release.manifest.releaseId
      ).pipe(Effect.flip);
      expect(error).toMatchObject({
        _tag: "PublicationRecoveryIdentityError",
        conflictingReleaseId: release.manifest.releaseId,
      });
      expect(state.stageRelease).not.toHaveBeenCalled();
    })
  );

  it.effect("rejects a recovery identity that aliases the active base", () =>
    Effect.gen(function* () {
      const release = yield* Effect.promise(() =>
        makeRelease("test-release-alias-base")
      );
      const state = makeTarget(release);
      const { baseReleaseId } = release.manifest;
      if (baseReleaseId === null) {
        return yield* Effect.die("Expected a release base.");
      }
      const error = yield* publish(release, state.target, baseReleaseId).pipe(
        Effect.flip
      );
      expect(error).toMatchObject({
        _tag: "PublicationRecoveryIdentityError",
        conflictingReleaseId: baseReleaseId,
      });
    })
  );

  it.effect("blocks activation when a staged replay changes", () =>
    Effect.gen(function* () {
      let replayCount = 0;
      const changedProjection = {
        ...projection,
        metadata: { ...projection.metadata, title: "Changed test protocol" },
      };
      const release = yield* Effect.promise(() =>
        makeRelease(
          "test-release-replay",
          Stream.suspend(() => {
            replayCount += 1;
            return Stream.make(
              replayCount < 7
                ? record
                : {
                    ...record,
                    record: {
                      ...record.record,
                      projection: changedProjection,
                    },
                  }
            );
          })
        )
      );
      const changedSummary = yield* digestProjections(
        release.manifest.releaseId,
        Stream.make(changedProjection)
      );
      const state = makeTarget(release);
      state.verify.mockImplementationOnce((signed) =>
        Effect.succeed({
          evidence: {
            ...state.evidence(signed.manifestHash),
            projectionDigest: changedSummary.digest,
          },
          phase: "verified",
        })
      );
      const error = yield* publish(release, state.target).pipe(Effect.flip);
      expect(error).toMatchObject({ _tag: "ReleaseVerificationMismatchError" });
      expect(replayCount).toBeGreaterThanOrEqual(7);
      expect(state.stageProjectionBatch).toHaveBeenCalledOnce();
      expect(state.activate).not.toHaveBeenCalled();
    })
  );

  it.effect("proves exact Git sources before any target write", () =>
    Effect.gen(function* () {
      const release = yield* Effect.promise(() =>
        makeRelease("test-release-source-preflight")
      );
      const state = makeTarget(release);
      const error = yield* publishPrepared(
        release.prepared,
        state.target,
        'export const metadata = {}\n\n<BlockMath math="y" />'
      ).pipe(Effect.flip);
      expect(error).toMatchObject({ _tag: "ReleaseArtifactMismatchError" });
      expect(state.stageRelease).not.toHaveBeenCalled();
      expect(state.stageItemBatch).not.toHaveBeenCalled();
      expect(state.stageProjectionBatch).not.toHaveBeenCalled();
      expect(state.stageArtifactBatch).not.toHaveBeenCalled();
    })
  );
});
