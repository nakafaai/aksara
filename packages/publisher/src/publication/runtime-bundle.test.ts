// @vitest-environment node
import { generateKeyPairSync } from "node:crypto";

import { NodeServices } from "@effect/platform-node";
import { ContentReleaseManifestSchema } from "@nakafa/aksara-contracts/release";
import type { ContentSnapshotManifest } from "@nakafa/aksara-contracts/release/snapshot/data";
import {
  PublicationScopeSchema,
  replaceContentSnapshot,
  snapshotRowCount,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "@nakafa/aksara-contracts/signature/spec";
import {
  makeTryoutSnapshot,
  tryoutSnapshotRowEvidence,
} from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Layer, Redacted, Stream } from "effect";
import { vi } from "vitest";

import { makePreparedGitRelease } from "#publisher/preparation/prepared";
import { preparePublicationPlan } from "#publisher/publication/plan";
import {
  PublicationSigningKey,
  PublicationSource,
  PublicationTarget,
} from "#publisher/publication/spec";
import {
  makeRelease,
  publicationSource,
  rendererManifest,
} from "#test/publication";
import { makePublicationTarget } from "#test/target";

vi.mock("#publisher/publication/snapshots", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("#publisher/publication/snapshots")>();
  const { Effect: RuntimeEffect } = await import("effect");
  return {
    ...actual,
    verifyPublicationSnapshots: (
      input: Parameters<typeof actual.verifyPublicationSnapshots>[0]
    ) =>
      RuntimeEffect.succeed({
        snapshots: input.manifest.snapshots,
        stagedRows: snapshotRowCount(input.manifest.snapshots),
      }),
  };
});

const keys = generateKeyPairSync("ed25519");
const signingKeyId = "test-plan-runtime-key";
const signingKey = PublicationSigningKey.of({
  keyId: signingKeyId,
  privateKeyPem: Redacted.make(
    keys.privateKey.export({ format: "pem", type: "pkcs8" }).toString()
  ),
});
const resolver = ContentVerificationKeyResolver.of({
  resolve: (keyId) =>
    keyId === signingKeyId
      ? Effect.succeed(
          keys.publicKey.export({ format: "pem", type: "spki" }).toString()
        )
      : Effect.fail(new SigningKeyNotFoundError({ keyId })),
});

const base = await makeRelease("test-plan-runtime-bundle");
const snapshot = makeTryoutSnapshot({
  activeAppLocales: base.manifest.activeAppLocales,
  catalogDigest: base.manifest.itemsDigest,
  counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
  placementCount: 1,
  placementDigest: base.manifest.resultDigest,
  routeCount: 5,
});
const snapshotEvidence = tryoutSnapshotRowEvidence(snapshot);
const snapshots = {
  ...base.manifest.snapshots,
  tryout: replaceContentSnapshot({
    baseSnapshotId: base.manifest.snapshots.tryout.resultSnapshotId,
    resultSnapshotId: snapshot.snapshotId,
    ...snapshotEvidence,
  }),
};
const manifest = ContentReleaseManifestSchema.make({
  ...base.manifest,
  scope: PublicationScopeSchema.make({
    ...base.manifest.scope,
    snapshots: ["tryout"],
  }),
  snapshots,
});
const tryoutManifest: ContentSnapshotManifest = {
  family: "tryout",
  manifest: snapshot,
};
const prepared = makePreparedGitRelease({
  items: base.prepared.items,
  manifest,
  projections: base.prepared.projections,
  rendererManifest,
  routes: base.prepared.routes,
  snapshotManifests: Stream.make(tryoutManifest),
  snapshotRows: Stream.empty,
});
const source = PublicationSource.of({
  loadExactRevision: () => Stream.make(publicationSource),
});

describe("publication runtime bundle planning", () => {
  it.effect("does not create a bundle for an unrelated release", () =>
    Effect.gen(function* () {
      const plan = yield* Effect.scoped(
        preparePublicationPlan({
          input: base.prepared,
          kind: "git",
          source,
        })
      ).pipe(
        Effect.provide([
          NodeServices.layer,
          Layer.succeed(PublicationSigningKey, signingKey),
          Layer.succeed(PublicationTarget, makePublicationTarget({})),
          Layer.succeed(ContentVerificationKeyResolver, resolver),
        ])
      );
      expect(plan.tryoutRuntimeBundle).toBeNull();
    })
  );

  it.effect("signs one exact Git try-out replacement independently", () =>
    Effect.gen(function* () {
      const plan = yield* Effect.scoped(
        preparePublicationPlan({ input: prepared, kind: "git", source })
      ).pipe(
        Effect.provide([
          NodeServices.layer,
          Layer.succeed(PublicationSigningKey, signingKey),
          Layer.succeed(PublicationTarget, makePublicationTarget({})),
          Layer.succeed(ContentVerificationKeyResolver, resolver),
        ])
      );
      if (plan.tryoutRuntimeBundle === null) {
        return yield* Effect.die("Expected one signed try-out runtime bundle.");
      }
      expect(plan.tryoutRuntimeBundle).toMatchObject({
        keyId: signingKeyId,
        payload: {
          rendererManifestHash: rendererManifest.hash,
          snapshot,
          sourceGitSha:
            manifest.origin.kind === "git" ? manifest.origin.sha : "",
          sourceManifestHash: plan.bundle.release.manifestHash,
          sourceReleaseId: manifest.releaseId,
        },
      });
    })
  );
});
