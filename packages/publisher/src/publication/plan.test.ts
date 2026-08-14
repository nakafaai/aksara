import { generateKeyPairSync } from "node:crypto";
import { Path } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { ContentDeleteSchema } from "@nakafa/aksara-contracts/release";
import { digestResultCatalog } from "@nakafa/aksara-contracts/release/result/digest";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import {
  inheritContentSnapshots,
  type PublicationScope,
  PublicationScopeSchema,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Layer, Redacted, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { prepareContentRelease } from "#publisher/preparation";
import type { PreparedGitRelease } from "#publisher/preparation/prepared";
import type { PrepareContentReleaseInput } from "#publisher/preparation/spec";
import { preparePublicationPlan } from "#publisher/publication/plan";
import {
  PublicationSigningKey,
  PublicationSource,
  PublicationTarget,
} from "#publisher/publication/spec";
import { testFileLayer } from "#test/files";
import {
  contentRecord,
  head,
  projection,
  publicationScope,
  rendererManifest,
} from "#test/publication";
import {
  emptySnapshotSources,
  makeProgramSnapshotFixture,
  snapshotPolicyBase,
} from "#test/snapshot";
import { makePublicationTarget } from "#test/target";

const keys = generateKeyPairSync("ed25519");
const signingKey = PublicationSigningKey.of({
  keyId: "test-plan-key",
  privateKeyPem: Redacted.make(
    keys.privateKey.export({ format: "pem", type: "pkcs8" }).toString()
  ),
});
const resolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      keys.publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
});
type SnapshotSources<E> = Pick<
  PrepareContentReleaseInput<E, never>,
  "snapshotManifests" | "snapshotRows"
>;

/** Prepares one real deletion against an authenticated compact base catalog. */
async function prepareDeletion<E>(
  snapshotSources: SnapshotSources<E>,
  snapshots: PublicationScope["snapshots"] = []
) {
  const baseReleaseId = ReleaseIdSchema.make("test-plan-base");
  const base = await Effect.runPromise(
    digestResultCatalog(baseReleaseId, Stream.make(head))
  );
  return Effect.runPromise(
    prepareContentRelease({
      aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
      baseActiveAppLocales: ACTIVE_APP_LOCALES,
      baseManifestHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
      baseReleaseId,
      baseResultCount: base.count,
      baseResultDigest: base.digest,
      previousSnapshots: inheritContentSnapshots(null),
      records: () =>
        Stream.make({
          prior: { head, state: "material" as const },
          record: {
            change: ContentDeleteSchema.make({
              artifactLocale: contentRecord.change.artifactLocale,
              contentKey: contentRecord.change.contentKey,
              family: "material",
              operation: "delete",
            }),
          },
        }),
      releaseId: ReleaseIdSchema.make("test-plan-delete"),
      rendererManifest,
      result: () => Stream.empty,
      routes: () =>
        Stream.make({
          current: {
            appLocale: projection.appLocale,
            contentKey: head.contentKey,
            publicPath: projection.publicPath,
          },
          next: {
            appLocale: projection.appLocale,
            contentKey: head.contentKey,
          },
        }),
      scope: { ...publicationScope, snapshots },
      ...snapshotSources,
    }).pipe(Effect.provide(NodeContext.layer))
  );
}

/** Prepares a real Program replacement without changing any MDX body head. */
async function prepareProgramOnly() {
  const snapshot = await makeProgramSnapshotFixture();
  return Effect.runPromise(
    prepareContentRelease({
      aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      records: () => Stream.empty,
      releaseId: ReleaseIdSchema.make("test-plan-program-only"),
      rendererManifest,
      result: () => Stream.empty,
      routes: () => Stream.empty,
      scope: PublicationScopeSchema.make({
        content: [],
        families: [],
        snapshots: ["program"],
      }),
      snapshotManifests: snapshot.snapshotManifests,
      snapshotRows: snapshot.snapshotRows,
      ...snapshotPolicyBase("test-plan-program-base"),
    }).pipe(Effect.provide(NodeContext.layer))
  );
}

/** Collects cache changes from one fully verified publication plan. */
function collectCacheChanges<E>(input: PreparedGitRelease<E, never>) {
  const source = PublicationSource.of({
    loadExactRevision: () => Stream.empty,
  });
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const plan = yield* preparePublicationPlan({
          input,
          kind: "git",
          source,
        });
        return yield* plan.cacheChanges().pipe(Stream.runCollect);
      })
    ).pipe(
      Effect.provide([
        testFileLayer(new Map()),
        Path.layer,
        Layer.succeed(PublicationSigningKey, signingKey),
        Layer.succeed(PublicationTarget, makePublicationTarget({})),
        Layer.succeed(ContentVerificationKeyResolver, resolver),
      ])
    )
  );
}

const programOnlyRelease = await prepareProgramOnly();

describe("preparePublicationPlan", () => {
  it("keeps family-wide invalidation for a body-free deletion", async () => {
    const prepared = await prepareDeletion(emptySnapshotSources);
    const changes = await collectCacheChanges(prepared);

    expect([...changes]).toEqual([{ family: "material" }]);
  });

  it("invalidates structured navigation for a snapshot-only release", async () => {
    const changes = await collectCacheChanges(programOnlyRelease);

    expect([...changes]).toEqual([{ family: "material" }]);
  });

  it("retains item and structured invalidation in a mixed release", async () => {
    const snapshot = await makeProgramSnapshotFixture();
    const prepared = await prepareDeletion(snapshot, ["program"]);
    const changes = await collectCacheChanges(prepared);

    expect([...changes]).toEqual([
      { family: "material" },
      { family: "material" },
    ]);
  });
});
