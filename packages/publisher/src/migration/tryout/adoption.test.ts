import { assert, describe, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { TryoutRuntimeAdoptionSourceSchema } from "@nakafa/aksara-contracts/migration/tryout/history/adoption";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema } from "effect";

import { adoptTryoutRuntimes } from "#publisher/migration/tryout/adoption";
import { failureReason } from "#test/migration/error";
import { otherHash } from "#test/migration/protocol";
import {
  migrationSigner,
  migrationVerificationResolver,
} from "#test/migration/signing";
import { adoptionSource, migrationId } from "#test/migration/source";
import { makePublicationTarget } from "#test/target";

/** Copies one structural source under a test-only retained release identity. */
function sourceWithReleaseId(releaseId: string) {
  return Schema.decodeSync(TryoutRuntimeAdoptionSourceSchema)({
    ...adoptionSource,
    release: {
      ...adoptionSource.release,
      manifest: { ...adoptionSource.release.manifest, releaseId },
    },
  });
}

describe("terminal try-out runtime adoption", () => {
  it.effect(
    "signs and adopts every source in deterministic release order",
    () =>
      Effect.gen(function* () {
        const first = sourceWithReleaseId("adoption-a");
        const second = sourceWithReleaseId("adoption-z");
        const requested: string[] = [];
        const target = makePublicationTarget({
          migrateTryoutHistory: (request) => {
            if (request.command !== "adoptBundle") {
              return Effect.die("Expected runtime adoption.");
            }
            requested.push(request.bundle.payload.sourceReleaseId);
            return Effect.succeed({
              command: request.command,
              migrationId,
              receipt: {
                adopted: 1,
                alreadyAdopted: 0,
                attemptCount: 1,
                bundleCreated: 1,
                bundleHash: request.bundle.bundleHash,
                bundleUnchanged: 0,
                inventoryHash: request.inventoryHash,
                snapshotId: request.bundle.payload.snapshot.snapshotId,
                sourceReleaseId: request.bundle.payload.sourceReleaseId,
              },
            });
          },
        });

        const receipts = yield* adoptTryoutRuntimes({
          migrationId,
          signer: migrationSigner,
          sources: [second, first],
          target,
        }).pipe(
          Effect.provideService(
            ContentVerificationKeyResolver,
            migrationVerificationResolver
          )
        );

        assert.deepStrictEqual(requested, ["adoption-a", "adoption-z"]);
        assert.strictEqual(receipts.length, 2);
        assert.strictEqual(receipts[0]?.sourceReleaseId, "adoption-a");
      })
  );

  it.effect("rejects contradictory backend adoption evidence", () =>
    Effect.gen(function* () {
      const target = makePublicationTarget({
        migrateTryoutHistory: (request) => {
          if (request.command !== "adoptBundle") {
            return Effect.die("Expected runtime adoption.");
          }
          return Effect.succeed({
            command: request.command,
            migrationId,
            receipt: {
              adopted: 1,
              alreadyAdopted: 0,
              attemptCount: 1,
              bundleCreated: 1,
              bundleHash: request.bundle.bundleHash,
              bundleUnchanged: 0,
              inventoryHash: request.inventoryHash,
              snapshotId: otherHash,
              sourceReleaseId: ReleaseIdSchema.make(
                adoptionSource.release.manifest.releaseId
              ),
            },
          });
        },
      });

      const failure = yield* adoptTryoutRuntimes({
        migrationId,
        signer: migrationSigner,
        sources: [adoptionSource],
        target,
      }).pipe(
        Effect.flip,
        Effect.provideService(
          ContentVerificationKeyResolver,
          migrationVerificationResolver
        )
      );

      assert.strictEqual(failureReason(failure), "adoption-evidence");
    })
  );

  it.effect("rejects a receipt for a different signed runtime bundle", () =>
    Effect.gen(function* () {
      const target = makePublicationTarget({
        migrateTryoutHistory: (request) => {
          if (request.command !== "adoptBundle") {
            return Effect.die("Expected runtime adoption.");
          }
          return Effect.succeed({
            command: request.command,
            migrationId,
            receipt: {
              adopted: 1,
              alreadyAdopted: 0,
              attemptCount: 1,
              bundleCreated: 1,
              bundleHash: otherHash,
              bundleUnchanged: 0,
              inventoryHash: request.inventoryHash,
              snapshotId: request.bundle.payload.snapshot.snapshotId,
              sourceReleaseId: request.bundle.payload.sourceReleaseId,
            },
          });
        },
      });

      const failure = yield* adoptTryoutRuntimes({
        migrationId,
        signer: migrationSigner,
        sources: [adoptionSource],
        target,
      }).pipe(
        Effect.flip,
        Effect.provideService(
          ContentVerificationKeyResolver,
          migrationVerificationResolver
        )
      );

      assert.strictEqual(failureReason(failure), "adoption-evidence");
    })
  );

  it.effect("rejects a receipt for a different private inventory", () =>
    Effect.gen(function* () {
      const target = makePublicationTarget({
        migrateTryoutHistory: (request) => {
          if (request.command !== "adoptBundle") {
            return Effect.die("Expected runtime adoption.");
          }
          return Effect.succeed({
            command: request.command,
            migrationId,
            receipt: {
              adopted: 1,
              alreadyAdopted: 0,
              attemptCount: 1,
              bundleCreated: 1,
              bundleHash: request.bundle.bundleHash,
              bundleUnchanged: 0,
              inventoryHash: otherHash,
              snapshotId: request.bundle.payload.snapshot.snapshotId,
              sourceReleaseId: request.bundle.payload.sourceReleaseId,
            },
          });
        },
      });

      const failure = yield* adoptTryoutRuntimes({
        migrationId,
        signer: migrationSigner,
        sources: [adoptionSource],
        target,
      }).pipe(
        Effect.flip,
        Effect.provideService(
          ContentVerificationKeyResolver,
          migrationVerificationResolver
        )
      );

      assert.strictEqual(failureReason(failure), "adoption-evidence");
    })
  );

  it.effect("authenticates the signed runtime before permanent adoption", () =>
    Effect.gen(function* () {
      const signer = {
        ...migrationSigner,
        signTryoutRuntimeBundle: (
          payload: Parameters<typeof migrationSigner.signTryoutRuntimeBundle>[0]
        ) =>
          migrationSigner.signTryoutRuntimeBundle(payload).pipe(
            Effect.map((bundle) => ({
              ...bundle,
              bundleHash: otherHash,
            }))
          ),
      };
      const target = makePublicationTarget({
        migrateTryoutHistory: () =>
          Effect.die("Invalid signed runtime must fail before adoption."),
      });

      const failure = yield* adoptTryoutRuntimes({
        migrationId,
        signer,
        sources: [adoptionSource],
        target,
      }).pipe(
        Effect.flip,
        Effect.provideService(
          ContentVerificationKeyResolver,
          migrationVerificationResolver
        )
      );

      assert.strictEqual(failureReason(failure), "target-evidence");
    })
  );

  it.effect("rejects a runtime without exact Git provenance", () =>
    Effect.gen(function* () {
      const rollback = yield* Schema.decodeEffect(
        TryoutRuntimeAdoptionSourceSchema
      )({
        ...adoptionSource,
        release: {
          ...adoptionSource.release,
          manifest: {
            ...adoptionSource.release.manifest,
            baseManifestHash: otherHash,
            baseReleaseId: "retained-base-release",
            origin: {
              kind: "rollback",
              releaseId: "retained-base-release",
            },
            snapshots: {
              ...adoptionSource.release.manifest.snapshots,
              tryout: {
                baseSnapshotId: adoptionSource.snapshot.snapshotId,
                mode: "inherit",
                resultSnapshotId: adoptionSource.snapshot.snapshotId,
                rowCount: 0,
                rowDigest:
                  "sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f",
              },
            },
          },
        },
      });
      const target = makePublicationTarget({
        migrateTryoutHistory: () =>
          Effect.die("Invalid provenance must fail before adoption."),
      });

      const failure = yield* adoptTryoutRuntimes({
        migrationId,
        signer: migrationSigner,
        sources: [rollback],
        target,
      }).pipe(
        Effect.flip,
        Effect.provideService(
          ContentVerificationKeyResolver,
          migrationVerificationResolver
        )
      );

      assert.strictEqual(failureReason(failure), "adoption-evidence");
    })
  );
});
