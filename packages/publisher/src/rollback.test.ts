import { describe, expect, it, vi } from "@effect/vitest";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, Stream } from "effect";
import {
  prepareRollbackFixture,
  proofBundle,
  releaseId,
  rendererManifest,
  rollbackOf,
  rollbackPage,
  rollbackTarget,
  signer,
  sourceRelease,
} from "#test/rollback/preparation";

describe("prepareRollback", () => {
  it.effect(
    "prepares an authenticated prior state as a new forward release",
    () =>
      Effect.scoped(
        Effect.gen(function* () {
          const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
          const prepared = yield* prepareRollbackFixture(
            rollbackTarget(loadPage)
          );
          const [artifacts, items, projections] = yield* Effect.all([
            prepared.artifacts.pipe(Stream.runCollect),
            prepared.items.pipe(Stream.runCollect),
            prepared.projections.pipe(Stream.runCollect),
          ]);
          expect(prepared.manifest).toMatchObject({
            baseManifestHash: sourceRelease.manifestHash,
            baseReleaseId: rollbackOf,
            itemCount: 1,
            origin: { kind: "rollback", releaseId: rollbackOf },
            projectionCount: 0,
            releaseId,
            resultCount: 0,
          });
          expect([...artifacts]).toEqual([]);
          expect(
            [...items].map(({ change: itemChange }) => itemChange.operation)
          ).toEqual(["delete"]);
          expect([...projections]).toEqual([]);
          expect(loadPage).toHaveBeenCalledTimes(1);
        })
      )
  );

  it.effect(
    "rejects an unauthenticated renderer before reading rollback state",
    () =>
      Effect.gen(function* () {
        const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
        const error = yield* Effect.scoped(
          prepareRollbackFixture(rollbackTarget(loadPage), {
            ...rendererManifest,
            hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
          })
        ).pipe(Effect.flip);

        expect(error._tag).toBe("RendererManifestHashMismatchError");
        expect(loadPage).not.toHaveBeenCalled();
      })
  );

  it.effect(
    "rebuilds the same candidate from its exact candidate rollback proof",
    () =>
      Effect.gen(function* () {
        const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
        const first = yield* Effect.scoped(
          prepareRollbackFixture(rollbackTarget(loadPage))
        );
        const candidate = {
          release: yield* signer.signRelease(first.manifest),
          rendererManifest,
        };
        const recovered = yield* Effect.scoped(
          prepareRollbackFixture(
            rollbackTarget(loadPage),
            rendererManifest,
            releaseId,
            candidate
          )
        );

        expect(recovered.manifest).toStrictEqual(first.manifest);
        expect(loadPage).toHaveBeenCalledTimes(2);
      })
  );

  it.effect(
    "rejects a signed proof that belongs to neither rollback identity",
    () =>
      Effect.gen(function* () {
        const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
        const otherActive = ReleaseIdSchema.make("test-other-active");
        const error = yield* Effect.scoped(
          prepareRollbackFixture(
            rollbackTarget(loadPage),
            rendererManifest,
            releaseId,
            proofBundle,
            otherActive
          )
        ).pipe(Effect.flip);

        expect(error).toMatchObject({ _tag: "RollbackProofIdentityError" });
        expect(loadPage).not.toHaveBeenCalled();
      })
  );

  it.effect(
    "rejects reuse of the active release identity before reading state",
    () =>
      Effect.gen(function* () {
        const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
        const error = yield* Effect.scoped(
          prepareRollbackFixture(
            rollbackTarget(loadPage),
            rendererManifest,
            rollbackOf
          )
        ).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "RollbackIdentityError",
          releaseId: rollbackOf,
          rollbackOf,
        });
        expect(loadPage).not.toHaveBeenCalled();
      })
  );
});
