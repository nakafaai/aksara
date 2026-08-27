// @vitest-environment node

import { Buffer } from "node:buffer";
import { generateKeyPairSync, sign } from "node:crypto";

import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { vi } from "vitest";

import {
  canonicalizeSignedTryoutHistoryMigrationPlan,
  canonicalizeSignedTryoutHistoryMigrationReceipt,
  canonicalizeTryoutHistoryMigrationPlanPayload,
  canonicalizeTryoutHistoryMigrationPlanSigningInput,
  canonicalizeTryoutHistoryMigrationReceiptPayload,
  canonicalizeTryoutHistoryMigrationReceiptSigningInput,
  canonicalizeTryoutHistoryMigrationSourceEvidence,
  canonicalizeTryoutHistoryMigrationTargetEvidence,
} from "#contracts/migration/tryout/history/canonical";
import {
  hashTryoutHistoryMigrationPlan,
  hashTryoutHistoryMigrationReceipt,
} from "#contracts/migration/tryout/history/hash";
import {
  SignedTryoutHistoryMigrationPlanSchema,
  SignedTryoutHistoryMigrationReceiptSchema,
  TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
  TryoutHistoryMigrationPlanPayloadSchema,
  TryoutHistoryMigrationReceiptPayloadSchema,
} from "#contracts/migration/tryout/history/spec";
import {
  verifySignedTryoutHistoryMigrationPlan,
  verifySignedTryoutHistoryMigrationReceipt,
} from "#contracts/migration/tryout/history/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";

/** Builds one deterministic hash-shaped test value. */
const hash = (character: string) => `sha256:${character.repeat(64)}`;
const migrationId = "retained-tryout-history-v1";
const keyId = "test-migration-key";

/** Builds one complete public-safe authorization payload. */
function makePlanPayload() {
  return Schema.decodeSync(TryoutHistoryMigrationPlanPayloadSchema)({
    format: TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
    migrationId,
    source: {
      artifactCount: 2,
      attempts: {
        attemptCount: 1,
        digest: hash("1"),
        frozenPlacementCount: 1,
        progressCount: 1,
        responseCount: 1,
        scoreCount: 1,
        sectionAttemptCount: 1,
      },
      catalogRowCount: 5,
      creatingReleaseId: "retained-release",
      legacyBundleCount: 1,
      placementRowCount: 1,
      releases: [
        {
          attemptCount: 1,
          manifestHash: hash("2"),
          releaseId: "retained-release",
        },
      ],
      rendererManifestHash: hash("3"),
      runtimeBundleCount: 0,
      scales: { digest: hash("4"), itemCount: 1, runCount: 1, versionCount: 1 },
      snapshot: {
        catalogDigest: hash("5"),
        counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
        format: "tryout-v1",
        locales: ["en", "id"],
        placementCount: 1,
        placementDigest: hash("6"),
        routeCount: 5,
        snapshotId: hash("7"),
      },
    },
    target: {
      artifacts: { count: 2, digest: hash("8") },
      bundleHash: hash("9"),
      catalog: { count: 5, digest: hash("a") },
      placements: { count: 1, digest: hash("b") },
      snapshot: {
        activeAppLocales: ["en", "id", "de"],
        catalogDigest: hash("c"),
        counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
        format: "localized-tryout-snapshot",
        placementCount: 1,
        placementDigest: hash("d"),
        routeCount: 5,
        snapshotId: hash("e"),
      },
    },
  });
}

/** Builds one complete public-safe terminal receipt payload. */
function makeReceiptPayload(planHash: string) {
  return Schema.decodeSync(TryoutHistoryMigrationReceiptPayloadSchema)({
    completion: {
      cleanupLimit: 30,
      completedAt: 1_787_764_800_000,
      migratedAttempts: 1,
      migratedScaleItems: 1,
      migratedScaleRuns: 1,
      migratedScaleVersions: 1,
      remainingMarkers: 0,
    },
    format: TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
    migrationId,
    planHash,
    sourceSnapshotId: hash("7"),
    targetBundleHash: hash("9"),
    targetSnapshotId: hash("e"),
  });
}

/** Creates independently signed plan and receipt fixtures. */
const makeSigningFixture = Effect.fn("AksaraContracts.makeMigrationFixture")(
  function* () {
    const keys = generateKeyPairSync("ed25519");
    const publicKey = keys.publicKey
      .export({ format: "pem", type: "spki" })
      .toString();
    const payload = makePlanPayload();
    const planHash = yield* hashTryoutHistoryMigrationPlan(payload);
    const plan = yield* Schema.decodeEffect(
      SignedTryoutHistoryMigrationPlanSchema
    )({
      keyId,
      payload,
      planHash,
      signature: sign(
        null,
        Buffer.from(
          canonicalizeTryoutHistoryMigrationPlanSigningInput(planHash, payload),
          "utf8"
        ),
        keys.privateKey
      ).toString("base64url"),
    });
    const receiptPayload = makeReceiptPayload(planHash);
    const receiptHash =
      yield* hashTryoutHistoryMigrationReceipt(receiptPayload);
    const receipt = yield* Schema.decodeEffect(
      SignedTryoutHistoryMigrationReceiptSchema
    )({
      keyId,
      payload: receiptPayload,
      receiptHash,
      signature: sign(
        null,
        Buffer.from(
          canonicalizeTryoutHistoryMigrationReceiptSigningInput(
            receiptHash,
            receiptPayload
          ),
          "utf8"
        ),
        keys.privateKey
      ).toString("base64url"),
    });
    const resolver = ContentVerificationKeyResolver.of({
      resolve: () => Effect.succeed(publicKey),
    });
    return { plan, receipt, resolver };
  }
);

describe("signed try-out history migration evidence", () => {
  it.effect("canonicalizes, hashes, and authenticates exact evidence", () =>
    Effect.gen(function* () {
      const { plan, receipt, resolver } = yield* makeSigningFixture();

      expect(
        JSON.parse(canonicalizeTryoutHistoryMigrationPlanPayload(plan.payload))
      ).toEqual(plan.payload);
      expect(
        JSON.parse(
          canonicalizeTryoutHistoryMigrationSourceEvidence(plan.payload.source)
        )
      ).toEqual(plan.payload.source);
      expect(
        JSON.parse(
          canonicalizeTryoutHistoryMigrationTargetEvidence(plan.payload.target)
        )
      ).toEqual(plan.payload.target);
      expect(
        JSON.parse(canonicalizeSignedTryoutHistoryMigrationPlan(plan))
      ).toEqual(plan);
      expect(
        JSON.parse(
          canonicalizeTryoutHistoryMigrationReceiptPayload(receipt.payload)
        )
      ).toEqual(receipt.payload);
      expect(
        JSON.parse(canonicalizeSignedTryoutHistoryMigrationReceipt(receipt))
      ).toEqual(receipt);
      expect(
        yield* verifySignedTryoutHistoryMigrationPlan(plan).pipe(
          Effect.provideService(ContentVerificationKeyResolver, resolver)
        )
      ).toEqual(plan);
      expect(
        yield* verifySignedTryoutHistoryMigrationReceipt(receipt).pipe(
          Effect.provideService(ContentVerificationKeyResolver, resolver)
        )
      ).toEqual(receipt);
    })
  );

  it.effect(
    "rejects malformed, reidentified, and wrongly signed evidence",
    () =>
      Effect.gen(function* () {
        const { plan, receipt, resolver } = yield* makeSigningFixture();
        const invalidSignature = `${"A".repeat(85)}A`;
        const failures = yield* Effect.all([
          verifySignedTryoutHistoryMigrationPlan({ ...plan, extra: true }).pipe(
            Effect.flip
          ),
          verifySignedTryoutHistoryMigrationPlan({
            ...plan,
            planHash: hash("f"),
          }).pipe(Effect.flip),
          verifySignedTryoutHistoryMigrationPlan({
            ...plan,
            signature: invalidSignature,
          }).pipe(Effect.flip),
          verifySignedTryoutHistoryMigrationReceipt({
            ...receipt,
            extra: true,
          }).pipe(Effect.flip),
          verifySignedTryoutHistoryMigrationReceipt({
            ...receipt,
            receiptHash: hash("f"),
          }).pipe(Effect.flip),
          verifySignedTryoutHistoryMigrationReceipt({
            ...receipt,
            signature: invalidSignature,
          }).pipe(Effect.flip),
        ]).pipe(
          Effect.provideService(ContentVerificationKeyResolver, resolver)
        );

        expect(failures.map((failure) => failure._tag)).toEqual([
          "TryoutHistoryMigrationDecodeError",
          "TryoutHistoryMigrationIdentityError",
          "SignatureInvalidError",
          "TryoutHistoryMigrationDecodeError",
          "TryoutHistoryMigrationIdentityError",
          "SignatureInvalidError",
        ]);
      })
  );

  it.effect(
    "maps plan and receipt digest failures without raw exceptions",
    () =>
      Effect.gen(function* () {
        const payload = makePlanPayload();
        const receipt = makeReceiptPayload(hash("f"));
        yield* Effect.acquireRelease(
          Effect.sync(() =>
            vi
              .spyOn(crypto.subtle, "digest")
              .mockRejectedValue(new TypeError("injected digest failure"))
          ),
          (mock) => Effect.sync(() => mock.mockRestore())
        );

        const failures = yield* Effect.all([
          hashTryoutHistoryMigrationPlan(payload).pipe(Effect.flip),
          hashTryoutHistoryMigrationReceipt(receipt).pipe(Effect.flip),
        ]);

        expect(failures).toEqual([
          expect.objectContaining({
            _tag: "TryoutHistoryMigrationHashError",
            migrationId,
            subject: "plan",
          }),
          expect.objectContaining({
            _tag: "TryoutHistoryMigrationHashError",
            migrationId,
            subject: "receipt",
          }),
        ]);
      })
  );
});
