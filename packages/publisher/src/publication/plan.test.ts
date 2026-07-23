import { generateKeyPairSync } from "node:crypto";
import { Path } from "@effect/platform";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentDeleteSchema } from "@nakafa/aksara-contracts/release";
import { digestResultCatalog } from "@nakafa/aksara-contracts/release/result-digest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Redacted, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { prepareContentRelease } from "#publisher/preparation";
import { preparePublicationPlan } from "#publisher/publication/plan";
import {
  PublicationSigningKey,
  PublicationSource,
  PublicationTarget,
} from "#publisher/publication/spec";
import { testFileLayer } from "#test/files";
import { contentRecord, head, rendererManifest } from "#test/publication";
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

/** Prepares one real deletion against an authenticated compact base catalog. */
async function prepareDeletion() {
  const baseReleaseId = ReleaseIdSchema.make("test-plan-base");
  const base = await Effect.runPromise(
    digestResultCatalog(baseReleaseId, Stream.make(head))
  );

  return Effect.runPromise(
    prepareContentRelease({
      aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
      baseManifestHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
      baseReleaseId,
      baseResultCount: base.count,
      baseResultDigest: base.digest,
      records: () =>
        Stream.make({
          prior: { head, state: "material" as const },
          record: {
            change: ContentDeleteSchema.make({
              contentKey: contentRecord.change.contentKey,
              family: "material",
              locale: contentRecord.change.locale,
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
            contentKey: head.contentKey,
            locale: head.locale,
            publicPath: head.publicPath,
          },
          next: { contentKey: head.contentKey, locale: head.locale },
        }),
    })
  );
}

describe("preparePublicationPlan", () => {
  it("keeps family-wide invalidation for a body-free deletion", async () => {
    const prepared = await prepareDeletion();
    const source = PublicationSource.of({
      loadExactRevision: () => Stream.empty,
    });
    const changes = await Effect.runPromise(
      Effect.scoped(
        Effect.gen(function* () {
          const plan = yield* preparePublicationPlan({
            input: prepared,
            kind: "git",
            source,
          });
          return yield* plan.cacheChanges().pipe(Stream.runCollect);
        })
      ).pipe(
        Effect.provide(testFileLayer(new Map())),
        Effect.provide(Path.layer),
        Effect.provideService(PublicationSigningKey, signingKey),
        Effect.provideService(PublicationTarget, makePublicationTarget({})),
        Effect.provideService(ContentVerificationKeyResolver, resolver)
      )
    );

    expect([...changes]).toEqual([{ family: "material" }]);
  });
});
