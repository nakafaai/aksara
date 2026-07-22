import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";
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
} from "#test/rollback-preparation";

describe("prepareRollback", () => {
  it("prepares an authenticated prior state as a new forward release", async () => {
    const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
    const result = await Effect.runPromise(
      Effect.scoped(
        Effect.gen(function* () {
          const prepared = yield* prepareRollbackFixture(
            rollbackTarget(loadPage)
          );
          const [artifacts, items, projections] = yield* Effect.all([
            prepared.artifacts().pipe(Stream.runCollect),
            prepared.items().pipe(Stream.runCollect),
            prepared.projections().pipe(Stream.runCollect),
          ]);
          return { artifacts, items, prepared, projections };
        })
      )
    );

    expect(result.prepared.manifest).toMatchObject({
      baseManifestHash: sourceRelease.manifestHash,
      baseReleaseId: rollbackOf,
      itemCount: 1,
      origin: { kind: "rollback", releaseId: rollbackOf },
      projectionCount: 0,
      releaseId,
      resultCount: 0,
    });
    expect([...result.artifacts]).toEqual([]);
    expect(
      [...result.items].map(({ change: itemChange }) => itemChange.operation)
    ).toEqual(["delete"]);
    expect([...result.projections]).toEqual([]);
    expect(loadPage).toHaveBeenCalledTimes(1);
  });

  it("rejects an unauthenticated renderer before reading rollback state", async () => {
    const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
    const error = await Effect.runPromise(
      Effect.scoped(
        prepareRollbackFixture(rollbackTarget(loadPage), {
          ...rendererManifest,
          hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        })
      ).pipe(Effect.flip)
    );

    expect(error._tag).toBe("RendererManifestHashMismatchError");
    expect(loadPage).not.toHaveBeenCalled();
  });

  it("rebuilds the same candidate from its exact pending rollback proof", async () => {
    const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
    const first = await Effect.runPromise(
      Effect.scoped(prepareRollbackFixture(rollbackTarget(loadPage)))
    );
    const pending = {
      release: await Effect.runPromise(signer.signRelease(first.manifest)),
      rendererManifest,
    };
    const recovered = await Effect.runPromise(
      Effect.scoped(
        prepareRollbackFixture(
          rollbackTarget(loadPage),
          rendererManifest,
          releaseId,
          pending
        )
      )
    );

    expect(recovered.manifest).toStrictEqual(first.manifest);
    expect(loadPage).toHaveBeenCalledTimes(2);
  });

  it("rejects a signed proof that belongs to neither rollback identity", async () => {
    const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
    const otherActive = ReleaseIdSchema.make("test-other-active");
    const error = await Effect.runPromise(
      Effect.scoped(
        prepareRollbackFixture(
          rollbackTarget(loadPage),
          rendererManifest,
          releaseId,
          proofBundle,
          otherActive
        )
      ).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ _tag: "RollbackProofIdentityError" });
    expect(loadPage).not.toHaveBeenCalled();
  });

  it("rejects reuse of the active release identity before reading state", async () => {
    const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
    const error = await Effect.runPromise(
      Effect.scoped(
        prepareRollbackFixture(
          rollbackTarget(loadPage),
          rendererManifest,
          rollbackOf
        )
      ).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "RollbackIdentityError",
      releaseId: rollbackOf,
      rollbackOf,
    });
    expect(loadPage).not.toHaveBeenCalled();
  });
});
