import { assert, describe, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { TryoutRuntimeAdoptionSourceSchema } from "@nakafa/aksara-contracts/migration/tryout/history/adoption";
import { Effect, Schema } from "effect";

import { adoptTryoutRuntimes } from "#publisher/migration/tryout/adoption";
import { failureReason } from "#test/migration/error";
import { otherHash } from "#test/migration/protocol";
import { migrationSigner } from "#test/migration/signing";
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
        });

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
      }).pipe(Effect.flip);

      assert.strictEqual(failureReason(failure), "adoption-evidence");
    })
  );
});
